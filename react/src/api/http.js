/**
 * get
 */
export function httpGet(url) {
    const result = fetch(url)
    return result
}
/**
 * post
 */
export function httpPost(url, params) {
    const result = fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json,text/plain,*/*'
        },
        body: JSON.stringify(params)
    })
    return result
}