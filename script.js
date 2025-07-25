// 탭 전환 처리
function showTab(tabId) {
  const tabs = ["formTab", "videoTab", "guideTab", "qnaTab", "contactTab"];
  tabs.forEach(id => {
    document.getElementById(id).style.display = (id === tabId) ? "block" : "none";
  });
}

// 사번 직접 입력 처리
document.getElementById("empOption").addEventListener("change", function () {
  const selected = this.value;
  const inputBox = document.getElementById("empIdContainer");
  const input = document.getElementById("empIdInput");
  if (selected === "직접 입력") {
    inputBox.style.display = "block";
  } else {
    inputBox.style.display = "none";
    input.value = selected;
  }
});

// 신청 폼 제출 처리
document.getElementById("residenceForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    if (key === "emp_id" && value === "직접 입력") {
      data["emp_id"] = formData.get("emp_id_input");
    } else if (key !== "emp_id_input") {
      data[key] = value;
    }
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
        document.getElementById("empIdContainer").style.display = "none";
      } else {
        document.getElementById("responseMsg").textContent = "⚠️ 오류가 발생했습니다. 다시 시도해주세요.";
      }
    })
    .catch(() => {
      document.getElementById("responseMsg").textContent = "⚠️ 제출 실패. 인터넷 연결을 확인해주세요.";
    });
});
