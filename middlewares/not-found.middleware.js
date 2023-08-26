export const notFound = async(req, res, next) => {
    res.send(`<h2> Page Not Found ${req.url} </h2>`)
}