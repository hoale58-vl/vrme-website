import configs from 'config/config';
import { create } from 'ipfs-http-client';

const client = create({
    host: configs.ipfs,
    protocol: 'https',
    port: 443,
});

export async function uploadIpfsFile(file: File) {
    const added = await client.add(file);
    return `https://${configs.ipfs}/ipfs/${added.path}`;
}

export async function uploadIpfs(content: string) {
    const added = await client.add(content);
    return `https://${configs.ipfs}/ipfs/${added.path}`;
}
