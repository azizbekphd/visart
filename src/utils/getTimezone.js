export default function getTimezone(){
    return (new Date()).getTimezoneOffset() / 60
}