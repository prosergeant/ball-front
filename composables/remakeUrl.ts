import {justURL} from "~/composables/baseUrl";

export default (url?: string) => url ? justURL + '/' + url.split('/').slice(3).join('/') : ''
