export default (url?: string) => url ? url.split('/').slice(3).join('/') : ''
