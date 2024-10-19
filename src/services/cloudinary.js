const cloudName = process.env.CLOUDINARY_CLOUD_NAME

export const getImagesByTag = async (tag) => {
  const imagesRes = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`)

  let imageUrls = []
  if (imagesRes.ok) {
    const images = await imagesRes.json()

    if (Array.isArray(images?.resources) && images.resources.length)
      imageUrls = images.resources.map(
        (image) => `https://res.cloudinary.com/${cloudName}/image/upload/${image.public_id}`,
      )
  } else console.error(imagesRes.headers.get('x-cld-error'))

  return {
    tag,
    images: imageUrls,
  }
}
