export function getAvatar(
  name: string,
  options?: { size?: number; colors?: string[] },
) {
  return encodeURI(
    `https://source.boringavatars.com/beam/${
      options?.size ?? 120
    }/${name}?colors=${
      options?.colors?.join(',') ?? '264653,2a9d8f,e9c46a,f4a261,e76f51'
    }`,
  )
}
