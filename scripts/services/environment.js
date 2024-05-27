const environment = {
    DEV_PATH: "",
    PROD_PATH: "/newflix"
}

export const ROOT_PATH = function getPath(isDev = true){
    return isDev ? environment.DEV_PATH : environment.PROD_PATH
}();