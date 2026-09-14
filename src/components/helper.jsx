// 메시지(경고창) 출력 함수
export function printAlert(message) {
  window.alert(message);
}

// 선택지(y/n) 출력 함수
export function printConfirm(message) {
  const confirmValue = window.confirm(message);
  return confirmValue;
}
