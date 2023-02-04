import axios, { AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { LOCAL_STORAGE_KEY } from './localStorage'

const RequestMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Options: 'OPTIONS',
  Head: 'HEAD',
  Patch: 'PATCH'
}

export interface HttpErrorResponseModel {
  id: string
  status: number
  message: string
  errors: any[]
  url: string
  raw: any
}
export const isHttpErrorResponseModel = (
  response: any
): response is HttpErrorResponseModel =>
  (response as HttpErrorResponseModel).id !== undefined

export default class HttpUtility {
  static async get (endpoint: string, params?: any, requestConfig?: any) {
    const paramsConfig = params ? { params } : undefined
    return await HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Get
      },
      {
        ...paramsConfig,
        ...requestConfig
      }
    )
  }

  static async post (endpoint: string, data?: any, headers?: any) {
    const config = data ? { data, headers } : undefined

    return await HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Post
      },
      config
    )
  }

  static async put (endpoint: string, data?: any) {
    const config = data ? { data } : undefined

    return await HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Put
      },
      config
    )
  }

  static async delete (endpoint: string) {
    return await HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Delete
      },
      {}
    )
  }

  static async _request (restRequest: any, config: any) {
    if (!restRequest.url) {
      console.error(
        `Received ${restRequest.url} which is invalid for a endpoint url`
      )
    }

    try {
      const loggedInUser = localStorage.getItem(LOCAL_STORAGE_KEY.USER)
      const [axiosResponse] = await Promise.all([
        axios({
          ...config,
          method: restRequest.method,
          url: restRequest.url,
          headers: {
            'Content-Type': config?.headers?.['Content-Type']
              ? config.headers['Content-Type']
              : 'application/json',
            Authorization: loggedInUser
              ? 'Bearer ' + JSON.parse(loggedInUser).token
              : '',
            ...config?.headers
          }
        }),
        HttpUtility._delay()
      ])

      const { status, data, request } = axiosResponse

      if (data.success === false) {
        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: data.errors.join(' - '),
            errors: data.errors,
            url: request ? request.responseURL : restRequest.url,
            raw: axiosResponse
          },
          restRequest
        )
      }

      return {
        ...(axiosResponse)
      }
    } catch (err) {
      const error = err as { [key: string]: any }
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        const { status, statusText, data } = error.response
        const errors = data.hasOwnProperty('errors')
          ? [statusText, ...data.errors]
          : [statusText]

        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: errors.filter(Boolean).join(' - '),
            errors,
            url: error.request.responseURL,
            raw: error.response
          },
          restRequest
        )
      } else if (error.request) {
        // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        const { status, statusText, responseURL } = error.request

        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: statusText,
            errors: [statusText],
            url: responseURL,
            raw: error.request
          },
          restRequest
        )
      }

      // Something happened in setting up the request that triggered an Error
      return HttpUtility._fillInErrorWithDefaults(
        {
          status: 0,
          message: error.message,
          errors: [error.message],
          url: restRequest.url,
          raw: error
        },
        restRequest
      )
    }
  }

  static _fillInErrorWithDefaults (
    error: any,
    request: any
  ): HttpErrorResponseModel {
    return {
      id: uuidv4(),
      status: error.status || 0,
      message: error.message || 'Error requesting data',
      errors: error.errors.length
        ? error.errors.filter(Boolean)
        : ['Error requesting data'],
      url: error.url || request.url,
      raw: error.raw
    }
  }

  /**
   * We want to show the loading indicator to the user but sometimes the api
   * request finished too quickly. This makes sure there the loading indicator is
   * visual for at least a given time.
   *
   * @param duration
   * @return {Promise<unknown>}
   * @private
   */
  static async _delay (duration = 250) {
    return await new Promise((resolve) => setTimeout(resolve, duration))
  }
}

export function truncateLongHexString (
  hexString: string,
  sliceLength: number = 6
) {
  return `${hexString.slice(0, sliceLength)}...${hexString.slice(
    -sliceLength
  )}`
}
