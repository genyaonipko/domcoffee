import Logo from './domcoffee.png';
import EmojiSad from './emoji_sad.png';

const getRandomImage = () => {
    const randomValue = Math.floor(Math.random() * (6 - 1)) + 1
    // eslint-disable-next-line
    const randomImage = require(`./coffee_random_${randomValue}.jpg`)
    return randomImage;
}

export default {
    Logo,
    EmojiSad,
    getRandomImage,
}