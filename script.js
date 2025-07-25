document.getElementById("residenceForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  fetch("https://script.google.com/macros/s/AKfycbwGv-OrrvK_Ff_EE_eULomt55SJOAmIWHlLdntzBxtI0ET417ZmZOwxVuMUF8xH3tyI/exec", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.result === "success") {
        document.getElementById("responseMsg").textContent = "✅ 신청이 완료되었습니다!";
        form.reset();
      } else {
        document.getElementById("responseMsg").textContent = "⚠️ 오류가 발생했습니다. 다시 시도해주세요.";
      }
    })
    .catch(() => {
      document.getElementById("responseMsg").textContent = "⚠️ 제출 실패. 인터넷 연결을 확인해주세요.";
    });
});
