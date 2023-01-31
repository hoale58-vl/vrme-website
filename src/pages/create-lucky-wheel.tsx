import { HeadFC, PageProps } from 'gatsby'
import * as React from 'react'
import { Layout, WheelComponent } from '../components'
import { SegColors } from '../styles/segcolor'
import { ILuckyWheel } from '../types/lucky-wheel'

const CreateLuckyWheel: React.FC<PageProps> = () => {
  const [prize, setPrize] = React.useState<ILuckyWheel[]>([
    {
      prize: '',
      winningRate: 0
    }
  ])

  const insert = (arr: ILuckyWheel[], index: number, newItem: ILuckyWheel) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]

  const handleAdd = (index: number) => {
    const temp: ILuckyWheel[] = insert(prize, index + 1, {
      prize: '',
      winningRate: index
    })
    setPrize(temp)
  }

  const handleRemove = (index: number) => {
    const temp: ILuckyWheel[] = [...prize.slice(0, index), ...prize.slice(index + 1)]
    // console.log(temp);
    setPrize(temp)
  }

  const handleInputChange = (e: any, index: number) => {
    setPrize((prize) => {
      const items: ILuckyWheel[] = prize.map((item, i) => {
        if (i === index) {
          return { ...item, prize: e.target.value }
        }
        return item
      })
      return items
    })
  }

  const [segments, setSegments] = React.useState<string[]>(['No prize'])

  const segColors = SegColors

  const onFinished = (winner: any) => {
    console.log(winner)
  }

  React.useEffect(() => {
    setSegments(
      ['No prize'].concat(
        prize.map((item: ILuckyWheel) => {
          return item.prize
        })
      )
    )
  }, [prize])
  console.log('kk', segments)

  return (
        <Layout>
            <div className="lucky-wheel-body">
                <div className="lucky-wheel-grid">
                    <h1 className="lucky-wheel-title">ViMRE Lucky Wheel</h1>
                    <div className="lucky-wheel-content">
                        Lucky wheel help you - the owner also seller earning more profit from your
                        real estate based on the value it is also attract people interested in your
                        listing, who will try their luck to purchase your MRE with the best price.
                    </div>
                    <div className="lucky-wheel-preview">Preview</div>
                    <div className="wheel-component-group">
                        <WheelComponent
                            segments={segments}
                            segColors={segColors}
                            winningSegment=""
                            onFinished={(winner: any) => onFinished(winner)}
                            primaryColor="black"
                            primaryColoraround="#ffffffb4"
                            contrastColor="white"
                            isOnlyOnce={false}
                            size={190}
                            // isActive={false}
                        />
                        <div className="wheel-component-cover"></div>
                    </div>
                    <div className="lucky-wheel-fee">Fee: 45000 USD (0.05% price)</div>
                </div>
                <div className="lucky-wheel-grid">
                    <div className="lucky-wheel-token-info">
                        <div className="lucky-wheel-token-name-group">
                            <div className="lucky-wheel-token-name">Vin Home Q8 #1</div>
                            <img className="w-8 h-8" src="/images/icon/verified.png" alt="" />
                        </div>
                        <div className="lucky-wheel-token-listing-price-label">Listing Price</div>
                        <div className="lucky-wheel-token-price">900000000</div>
                        <div className="lucky-wheel-token-price-unit">USDT</div>
                    </div>
                    <div className="lucky-wheel-prize-winning-rate">Prize and Winning Rate</div>
                    <div className="lucky-wheel-prize-winning-rate-group">
                        <div className="lucky-wheel-prize-winning-rate-ele">
                            <input
                                className="prize-type prize-type-default"
                                type="text"
                                placeholder="No prize"
                            />
                            <input
                                className="prize-rate prize-rate-default"
                                type="number"
                                placeholder="100"
                                defaultValue={100}
                                min={0}
                                max={100}
                            />
                            <img
                                className=""
                                onClick={() => handleAdd(-1)}
                                src="/images/icon/round-create.png"
                                alt=""
                            />
                            <img src="/images/icon/round-subs.png" alt="" />
                        </div>
                        <div
                            className="overflow-auto"
                            style={{ height: '420px', marginTop: '30px' }}
                        >
                            {prize.length > 0 ? (
                              prize.map((sub: ILuckyWheel, index: number) => {
                                return (
                                        <div
                                            className="lucky-wheel-prize-winning-rate-ele"
                                            key={index}
                                        >
                                            <input
                                                className="prize-type"
                                                type="text"
                                                placeholder=""
                                                value={sub.prize}
                                                onChange={(e) => handleInputChange(e, index)}
                                            />
                                            <input
                                                className="prize-rate"
                                                type="number"
                                                placeholder="0"
                                                min={0}
                                                max={100}
                                            />
                                            <img
                                                onClick={() => handleAdd(index)}
                                                src="/images/icon/round-create.png"
                                                alt=""
                                            />
                                            <img
                                                onClick={() => handleRemove(index)}
                                                src="/images/icon/round-subs.png"
                                                alt=""
                                            />
                                        </div>
                                )
                              })
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default CreateLuckyWheel

export const Head: HeadFC = () => <title>Create Lucky Wheel</title>
