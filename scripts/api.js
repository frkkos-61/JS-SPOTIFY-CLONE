/// api url'i
const url = "https://shazam.p.rapidapi.com/search?term=tarkan&locale=tr";

//* gönderilmesi gereken headerler

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "1e92b00937mshc663d03584ee621p172510jsnace85c2ed25f",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

//! fonskiyonların bir arada tutulması için classyapısını tercih edelim

export class API {
  //* Popular müzikler

  async getPopular() {
    const data2 = await this.searchMusic("uzi");
    const data3 = await this.searchMusic("hadise");

    return [...data2, ...data3];
  }

  //* aratılan kelimeye uygun sonuçlar
  async searchMusic(query) {
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`;

    //* api isteğini at - gelen cevabı işle
    const res = await fetch(url, options);
    const data = await res.json();

    //* veriyi formatladık
    const formatted = data.tracks.hits.map((item) => item.track);

    //* fonksiyonun çağırıldığı yere veriyi döndürdük
    return formatted;
  }
}
