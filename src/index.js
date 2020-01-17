const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
const {Parser} = require('json2csv');


async function extracao(site) {
    const html = await request.get(site);
    const $ = await cheerio.load(html);
    let orgaoLicitacao = $('body > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.tex3 > table > tbody > tr:nth-child(5) > td > p').text().trim();
    let uasgLicitacao = $('body > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.tex3 > table > tbody > tr:nth-child(6)').text().trim();
    let numeroLicitacao  = $('body > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td.tex3 > table > tbody > tr > td').text().trim();

    for (i=1;i<101;i++){
        let itensTitulo  = $(`body > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(5) > td.tex3 > table:nth-child(2) > tbody > tr:nth-child(${i}) > td:nth-child(2) > span.tex3b`).text().trim();
        let itensDescricao  = $(`body > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(5) > td.tex3 > table:nth-child(2) > tbody > tr:nth-child(${i}) > td:nth-child(2) > span.tex3`).text().trim();
  
        console.log([orgaoLicitacao, uasgLicitacao, numeroLicitacao, itensTitulo, itensDescricao])
    }
  
}
extracao(`http://www.comprasnet.gov.br/ConsultaLicitacoes/download/download_editais_detalhe.asp?origem=3&coduasg=788820&modprp=5&numprp=392019`);
