export const extractContent = (s) => {
    const span = document.createElement('span')
    span.innerHTML = s
    return span.textContent || span.innerText
}