require('./index.scss')
const summerBg = require('./assets/summer-bg.jpg')
const rainyBg = require('./assets/rainy-bg.jpg')
const winterBg = require('./assets/winter-bg.jpg')
const urlSunIcon = require('./assets/icons/sun.svg')
const urlRainIcon = require('./assets/icons/cloud-rain.svg')
const urlSnowIcon = require('./assets/icons/cloud-snow.svg')
const urlPauseIcon = require('./assets/icons/pause.svg')
const urlSunAudio = require('./assets/sounds/summer.mp3')
const urlRainAudio = require('./assets/sounds/rain.mp3')
const urlSnowAudio = require('./assets/sounds/winter.mp3')

const img: HTMLImageElement = new Image()
img.src = summerBg
img.src = rainyBg
img.src = winterBg
img.src = urlSunIcon
img.src = urlRainIcon
img.src = urlSnowIcon
img.src = urlPauseIcon

const sunAudio: HTMLAudioElement = new Audio(urlSunAudio)
const rainAudio: HTMLAudioElement = new Audio(urlRainAudio)
const snowAudio: HTMLAudioElement = new Audio(urlSnowAudio)

const volumeSlider: HTMLInputElement | null = document.getElementById(
  'volume',
) as HTMLInputElement

const sunButton: HTMLElement | null = document.getElementById('sun-button')
const rainButton: HTMLElement | null = document.getElementById('rain-button')
const snowButton: HTMLElement | null = document.getElementById('snow-button')

const sunIcon: HTMLElement | null = document.getElementById('sun')
const rainIcon: HTMLElement | null = document.getElementById('rain')
const snowIcon: HTMLElement | null = document.getElementById('snow')

const body: HTMLBodyElement = document.body as HTMLBodyElement

const changeBackground = (button: HTMLElement | null, image: string): void => {
  sunButton?.classList.remove('active')
  rainButton?.classList.remove('active')
  snowButton?.classList.remove('active')
  button?.classList.add('active')
  body.style.backgroundImage = `url(${image})`
}

let index: number = 0

const toggleCurrentIconOrPauseIcon = (
  el: HTMLElement | null,
  arrTwoImages: string[],
): void => {
  index = (index + 1) % arrTwoImages.length
  el!.style.backgroundImage = arrTwoImages[index]
}

sunButton?.addEventListener('click', () => {
  rainIcon!.style.backgroundImage = `url(${urlRainIcon})`
  snowIcon!.style.backgroundImage = `url(${urlSnowIcon})`

  toggleCurrentIconOrPauseIcon(sunIcon, [
    `url(${urlPauseIcon})`,
    `url(${urlSunIcon})`,
  ])

  changeBackground(sunButton, summerBg)
  playOrPauseAudio(sunAudio)
})

rainButton?.addEventListener('click', () => {
  sunIcon!.style.backgroundImage = `url(${urlSunIcon})`
  snowIcon!.style.backgroundImage = `url(${urlSnowIcon})`

  toggleCurrentIconOrPauseIcon(rainIcon, [
    `url(${urlPauseIcon})`,
    `url(${urlRainIcon})`,
  ])

  changeBackground(rainButton, rainyBg)
  playOrPauseAudio(rainAudio)
})

snowButton?.addEventListener('click', () => {
  sunIcon!.style.backgroundImage = `url(${urlSunIcon})`
  rainIcon!.style.backgroundImage = `url(${urlRainIcon})`

  toggleCurrentIconOrPauseIcon(snowIcon, [
    `url(${urlPauseIcon})`,
    `url(${urlSnowIcon})`,
  ])

  changeBackground(snowButton, winterBg)
  playOrPauseAudio(snowAudio)
})

const allAudio: HTMLAudioElement[] = [sunAudio, rainAudio, snowAudio]

const stopAllAudio = (): void => {
  allAudio.forEach((audio) => {
    audio.pause()
  })
}

const setVolumeAllAudio = (value: string): void => {
  allAudio.forEach((audio) => {
    audio.volume = Number(value)
  })
}

const playOrPauseAudio = (audio: HTMLAudioElement): void => {
  if (audio.paused) {
    stopAllAudio()
    audio.play()
  } else {
    audio.pause()
  }
}

volumeSlider?.addEventListener('input', () => {
  setVolumeAllAudio(volumeSlider.value)
})
