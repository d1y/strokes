export const isDev = process.env.NODE_ENV != 'production'

export const release = "preview"

export const isPost = release != "preview"