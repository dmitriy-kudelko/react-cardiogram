<h1 align="center">Welcome to react-cardiogram 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-cardiogram" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-cardiogram.svg">
  </a>
  <a href="https://github.com/dmitriy-kudelko/react-cardiogram#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/dmitriy-kudelko/react-cardiogram/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/dmitriy-kudelko/react-cardiogram/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/dmitriy-kudelko/react-cardiogram" />
  </a>
</p>

> Animated cardiogram component for React

Inspired by and based on [ecg-line-webcomponent](https://github.com/tripolskypetr/ecg-line-webcomponent) package.

### ✨ [Demo](https://react-cardiogram.vercel.app)

## Install

```sh
npm i react-cardiogram
```
or 

```sh
yarn add react-cardiogram
```

## Options

| Name            | Description   | Optional | Default | Unit |
| --------------- |-------------- | -------- | ------- | ---- |
| `height`        | Canvas height | No | `100` | px | 
| `width`         | Default canvas width. Not necessary to explicitly set as it auto-adjusts to a container width. | No  | `500` | px |
| `color`         | Line color | No | `#22ff22` | HEX |
| `scale`         | How much of canvas height the actual drawing takes | No  | `0.35` | % |
| `density`       | Horizontal "resolution". i.e setting 2 will render 250 points for 500px-wide container | No  | `2` | px |
| `thickness`     | Line thickness | No  | `2` | px |
| `cursorSize`    | The size of cursor | No  | `3` | px |
| `paintInterval` | Time interval between drawing any two adjacent points. Eventually controls the cardiogram "speed". | No  | `30` | ms|
| `beatFrequency` | Draws a spike each number of `ms` when provided | Yes  | - | ms|


## Author

👤 **Dmitriy Kudelko <dmitriy.kudelko@gmail.com>**

* Github: [@dmitriy-kudelko](https://github.com/dmitriy-kudelko)
* LinkedIn: [@dmitry-kudelko](https://linkedin.com/in/dmitry-kudelko)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Dmitriy Kudelko <dmitriy.kudelko@gmail.com>](https://github.com/dmitriy-kudelko).<br />
This project is [MIT](https://github.com/dmitriy-kudelko/react-cardiogram/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
