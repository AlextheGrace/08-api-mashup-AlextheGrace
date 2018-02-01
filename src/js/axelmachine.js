export function axelVisar(data) {
    return Object.keys(data).map(function(key) {
        console.log([key, data[key]]);
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
  }