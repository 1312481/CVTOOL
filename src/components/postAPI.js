
const POSTAPI = (link, profile, key, version) => {
    return (fetch(link, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            profile: profile,
            key: key,
            version: version
        })
    }))
    .then(respone => respone.json())
}

export default POSTAPI;