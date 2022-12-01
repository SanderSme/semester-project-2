import { CREATE_POST_API_URL } from "./settings/api";
import { getToken } from './utils/storage';
import { isValidUrl } from "./utils/validation";


const listItemForm = document.querySelector("#listItemForm")

const image = document.querySelector("#image")
const imageErrorMessage = document.querySelector("#imageErrorMessage")

const title = document.querySelector("#title")
const titleErrorMessage = document.querySelector("#titleErrorMessage")

const description = document.querySelector("#description")

const tags = document.querySelector("#tags")

const auctionEnds = document.querySelector("#auctionEnds")
const auctionEndsError = document.querySelector("#auctionEndsError")

const listItemErrorMessage = document.querySelector("#listItemErrorMessage")

listItemForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let isImageValid = false;
    isImageValid = isValidUrl(image.value) || image.value === '';
    if(isImageValid) {
        imageErrorMessage.classList.add('hidden')
    } else {
        imageErrorMessage.classList.remove('hidden')
    }
    let isTitle = false;
    if(title.value.trim().length > 0) {
        titleErrorMessage.classList.add('hidden');
        isTitle = true;
    } else {
        titleErrorMessage.classList.remove('hidden')
    }
    if(auctionEnds.value) {
        const date = new Date(auctionEnds.value)
        auctionEndsError.classList.add('hidden')
    } else {
        auctionEndsError.classList.remove('hidden')
    }
    if(tags.value) {
        const tagsString = new String(tags.value)
        const tagsArray = tagsString.split(' ')
    }
})