import { debounce } from "../src/debounce";

const log = debounce((value: string) => {
  console.log(value);
}, 500);

log("T");
log("To");
log("Tom");