export function successNotification(message) {
    $('#successBox').text(message).parent().show().delay(5000).hide(0);
}

export function errorNotification(message) {
    $('#errorBox').text(message).parent().show().delay(5000).hide(0);
}