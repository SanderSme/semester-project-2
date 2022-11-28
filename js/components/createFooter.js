import { getUserName } from "../utils/storage";

function createFooter() {
    const footerContent = document.querySelector("#footerContent")
    if(footerContent) {
        const userName = getUserName()
        let footerLinks;
        footerLinks = `<a href="/index.html" class="hover:underline">Home</a>
        <div class="flex flex-col">
          <a href="/login.html" class="hover:underline">Log In</a>
        </div>`
        if(userName) {
            footerLinks = `<a href="/index.html" class="hover:underline">Home</a>
            <div class="flex flex-col">
              <a href="/profile.html" class="hover:underline">Profile</a>
              <a href="/list-item.html" class="mt-3 hover:underline">List Item</a>
              <button type="button" class="mt-3 hover:underline logOutBtn">Log Out</button>
            </div>`
        }
        footerContent.innerHTML = `${footerLinks}`
    }
}

export default createFooter;