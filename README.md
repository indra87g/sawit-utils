# Sawit Utils

A palm-based library for your various project needs. I actually created this package solely for personal use in my WhatsApp bot project. 
However, if you'd like to use it too, feel free to do so :D 
## Getting Started

### Install
Currently, sawit-utils is available in the [npmjs](https://www.npmjs.com/package/sawit-utils) and [jsr](https://jsr.io/@indra87g/sawit-utils) registry. 

```sh
npm install sawit-utils # npm

bun jsr add @indra87g/sawit-utils # bunjs (jsr)
```

## Use
For example, we want to download reels video from Instagram: 

```js
import { igdl } from "sawit-utils"

const instagram = await igdl(URL);
console.log(instagram.data.videoUrl);
```

## Planned Feature
- Payment API
	- Mustikapay
    - Zakkistore
    - Pakasir

## Contributing
### Procedures 
- Fork this repository
- Make your commit
- Open pull request and wait for code review
- Dont forget to give a star :)

### Rules
- Use AI only in type definition generation

## License

MIT