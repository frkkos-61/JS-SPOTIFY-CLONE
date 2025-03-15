import { API } from "./api.js";
import { UI } from "./ui.js";

//* methodları kullanbilmek için class' ın örneğini al
const api = new API();
const ui = new UI();

//* Kullanıcı sayfaya girdiği anda, sayfa yüklendiği anda API' dan popüler müzikleri renderle

document.addEventListener("DOMContentLoaded", () => {
  api
    .getPopular()
    .then((data) =>
      //* gelen data içerisindeki her bir nesne için ekrana kartları bas
      ui.renderCards(data)
    )
    .catch((err) => {
      console.log(err);
    });
});

//* Form' dan bir şey aratıldığında API' dan aratılan kelimeye uygun sonuçları al ve renderle
ui.form.addEventListener("submit", (e) => {
  //* sayfayı yenilemeyi engelle
  e.preventDefault();

  //* aratılan kelimeye eriş
  const query = e.target[0].value;

  //* aratılan kelime boşsa fonksiyonu durdur
  if (query.trim() == "") return alert("Lütfen geçerli bir metin aratın");

  //*ekrana loader bas
  ui.renderLoader();

  //*başlığı güncelle
  ui.updateTitle(query + " için sonuçlar ");

  //* API^ dan verileri al
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("Üzgünüz bir sorun oluştu");
    });
});

//* Liste alanındaki tıklanma olaylarını izle ve eğer oynat butonuna tıklanırsa o şarkıyı oynat

ui.list.addEventListener("click", (e) => {
  //* Eğer oynat butonuna tıklanırsa o şarkıyı oynat
  if (e.target.className === "play") {
    //* oynatılacak şarkının kartına eriş
    const card = e.target.closest(".card");

    //* oynatılacak şarkının bilgilerini al
    const data = card.dataset;

    //* player alanını tekrar renderle
    ui.renderPlayer(data);
  }
});
