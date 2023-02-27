export const getFileType = (type) => {
    if (type.includes("image")) {
        return "fa-file-image";
    } else if (type.includes("video")) {
        return "fa-file-video";
    } else if (type.includes("media")) {
        return "fa-photo-film";
    } else if (type.includes("audio")) {
        return "fa-file-audio";
    } else if (type.includes("pdf")) {
        return "fa-file-pdf";
    } else if (type.includes("vnd.ms-excel")) {
        return "fa-file-csv";
    } else if (type.includes("spreadsheet")) {
        return "fa-file-excel";
    } else if (type.includes("zip")) {
        return "fa-file-zipper";
    } else if (type.includes("word")) {
        return "fa-file-word";
    } else if (type.includes("json")) {
        return "fa-table";
    } else if (type.includes("download")) {
        return "fa-download";
    } else {
        return "fa-file";
    }
};

export const fileSizeConverter = (size) => {
    let formattedSize = "";
    const kbSize = Math.round(size / 1000);
    formattedSize = kbSize.toString() + "KB";
    if (kbSize > 1000) {
        formattedSize = Math.round(kbSize / 1000).toString() + "MB";
        console.log(formattedSize);
        if (formattedSize > 1000) {
            formattedSize = Math.round(formattedSize / 1000).toString() + "GB";
        }
    }
    console.log("Formatted size: " + formattedSize);
    return formattedSize;
};

export const isFileSmall = (size) => {
    console.log(size / 1000 / 1000 / 1000);
    return size / 1000 / 1000 / 1000 < 1;
};

export const getLink = () => {
    if (window.location.origin.at(-1) === "/") {
        return window.location.origin;
    }else {
        return window.location.origin + "/"
    }
}