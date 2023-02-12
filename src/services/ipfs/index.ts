import axios from 'axios';
import configs from 'config/config';

export async function uploadIpfsFile(file: File) {
    const formdata = new FormData();
    formdata.append('file', file);

    const response = await axios({
        method: 'POST',
        url: `https://${configs.ipfs}/api/v0/add`,
        data: formdata,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    });
    const hash: string = response.data.Hash;
    return `https://${configs.ipfs}/ipfs/${hash}`;
}

export async function uploadIpfs(content: string) {
    const formdata = new FormData();
    const blob = new Blob([content], { type: 'text/plain' });
    const file = new File([blob], 'content', { type: 'text/plain' });
    formdata.append('file', file);

    const response = await axios({
        method: 'POST',
        url: `https://${configs.ipfs}/api/v0/add`,
        data: formdata,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    });
    const hash: string = response.data.Hash;
    return `https://${configs.ipfs}/ipfs/${hash}`;
}
