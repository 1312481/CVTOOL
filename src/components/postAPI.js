import React from 'react'

const POSTAPI = (link, profile, key) => {
    return (fetch(link, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            profile: profile,
            key: key
        })
    }))
}

export default POSTAPI;