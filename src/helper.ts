export const addToWishList = (movie: any) => {
    const dataWishListed = JSON.parse(localStorage.getItem("wishList") || "")
    const dataCheck = dataWishListed.find((i: { id: number }) => i.id === movie.id)
    if (!dataCheck) {
        localStorage.setItem("wishList", JSON.stringify([...dataWishListed, movie]))
        return [...dataWishListed, movie]
    }
    return []

};

export const statusWish = (movie: any) => {
    const dataWishListed = JSON.parse(localStorage.getItem("wishList") || "{}")
    const data = dataWishListed.find((i: { id: number }) => i.id === movie.id)
    return data ? true : false
}



export const removeToWishList = (movie: any) => {
    const dataWishListed = JSON.parse(localStorage.getItem("wishList") || "")
    const dataCheck = dataWishListed.filter((i: { id: number }) => i.id !== movie.id)
    localStorage.setItem("wishList", JSON.stringify([...dataCheck]))
    return [...dataCheck]

};