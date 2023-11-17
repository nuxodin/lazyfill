/* Copyright (c) 2016 Tobias Buschor https://goo.gl/gl0mbf | MIT License https://goo.gl/HgajeK */
!function(){ 'use strict';

const share = async function(data){

    if (!window.HTMLDialogElement) {
        await import('https://cdn.jsdelivr.net/gh/nuxodin/dialog-polyfill@1.4.1/dialog.min.js');
    }

    const dialog = document.createElement('dialog');
    dialog.className = 'c1Share';
    dialog.innerHTML = '<header><h2>'+txt.shareTitle+'</h2></header><div class=-body></div>'+style;
    const body = dialog.querySelector('.-body');

    //let shared = false;
    function close(){ // to be animated
        dialog.classList.remove('-Open');
        setTimeout(()=>{
            dialog.close();
        },200);
    }

    const buildText = (...parts) => parts.filter(Boolean).join('\n\n');
    const payload = {
        title: enc(data.title),
        text: enc(data.text),
        url: enc(data.url),
        titleText: enc(buildText(data.title, data.text)+'\n'),
        titleTextUrl: enc(buildText(data.title, data.text, data.url)+'\n'),
        textUrl: enc(buildText(data.text, data.url)+'\n'),
    }

    document.body.append(dialog);
    dialog.showModal();
    dialog.classList.add('-Open');
    dialog.addEventListener('close', () => {
        //shared ? resolve() : reject(); // safaris implementation of the promise
        dialog.remove();
    });

    share.items.forEach((item,name)=>{
        name = txt[name] || name;
        const a = document.createElement('a');
        a.innerHTML = item.svg+name;
        a.href = item.url ? item.url(payload) : '';
        a.target = 'share_poly';
        a.addEventListener('click',e=>{
            if (item.click) item.click(data);
            else window.open(a.href, 'share_poly', 'width=700,height=500');
            close();
            //shared = true;
            e.preventDefault();
        });
        body.append(a);
    });
    dialog.addEventListener('click', e => e.target === dialog && close() );

    // like the Chrome implementation, it resolves when the dialogue is opened. (not like safari)
    // now that we made the share function async, we dont need the promse anymore.
    // return new Promise((resolve)=>resolve());
};
share.items = new Map();

share.items.set('E-Mail',{
    url: ({title, textUrl}) => 'mailto:?subject='+title+'&body='+textUrl,
    svg:'<svg height="80" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>',
});
share.items.set('SMS',{
    url: ({titleTextUrl}) => 'sms:?body='+titleTextUrl,
    svg:'<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"></path></svg>',
});
share.items.set('Copy',{
    click: data => navigator.clipboard.writeText(`${data.title}\n${data.text || ''}\n${data.url}`),
    svg:'<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>',
});
share.items.set('Twitter',{
    url: ({titleText, url}) => 'https://twitter.com/intent/tweet?original_referer='+enc(location.href)+'&ref_src=twsrc%5Etfw&text='+titleText+'&tw_p=tweetbutton&url='+url,
    svg:'<svg height="80" viewBox="0 0 256 209" preserveAspectRatio="xMidYMid"><path d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057-10.147 6.018-21.388 10.39-33.35 12.745C205.994 7.2 192.344.822 177.238.822c-29.007 0-52.524 23.516-52.524 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.19-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.274 34.297 23.366 43.716-8.61-.273-16.708-2.635-23.79-6.57-.003.22-.003.44-.003.66 0 25.448 18.104 46.676 42.13 51.5-4.407 1.2-9.047 1.843-13.837 1.843-3.385 0-6.675-.33-9.88-.943 6.682 20.866 26.078 36.05 49.06 36.475-17.974 14.086-40.62 22.483-65.227 22.483-4.24 0-8.42-.25-12.53-.734 23.243 14.903 50.85 23.598 80.51 23.598 96.607 0 149.434-80.03 149.434-149.435 0-2.278-.05-4.543-.152-6.795 10.26-7.405 19.166-16.655 26.208-27.188"/></svg>',
});
share.items.set('Facebook',{
    url: ({url, title}) => 'https://www.facebook.com/sharer/sharer.php?u='+url+'&t='+title,
    svg:'<svg height="80" viewBox="88.428 12.828 107.543 207.085"><path d="M158.232 219.912v-94.46h31.707l4.746-36.814h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.01V14.28c-3.372-.447-14.943-1.45-28.405-1.45-28.106 0-47.348 17.156-47.348 48.662v27.15h-31.79v36.812h31.79v94.46h38.015z"/></svg>',
});
share.items.set('Telegram',{
    url: ({titleTextUrl}) => 'https://telegram.me/share/msg?url='+enc(location.host)+'&text=' + titleTextUrl,
    svg: '<svg viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"></path></svg>'
});
share.items.set('Pinterest',{
    url: ({url,titleText}) => 'https://pinterest.com/pin/create/button/?url='+url+'&xmedia='+'&description='+titleText,
    svg:'<svg width="80" viewBox="0 0 24 24"><path clip-rule="evenodd" fill-rule="evenodd" d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.95-.2-2.4.04-3.44l1.4-5.96s-.35-.72-.35-1.78c0-1.67.96-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.7 0 1.02-.66 2.56-1 3.99-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88a5.2 5.2 0 0 0-5.42 5.2c0 1.04.4 2.14.9 2.74.1.12.1.23.08.35l-.34 1.36c-.05.22-.17.27-.4.16-1.5-.7-2.43-2.89-2.43-4.65 0-3.78 2.75-7.26 7.92-7.26 4.17 0 7.4 2.97 7.4 6.93 0 4.14-2.6 7.46-6.22 7.46-1.22 0-2.36-.63-2.75-1.37l-.75 2.85c-.27 1.04-1 2.35-1.5 3.15A12.03 12.03 0 0 0 24 12 12 12 0 0 0 12 0z" /></svg>',
});
share.items.set('WhatsApp',{
    url: ({titleTextUrl}) => 'https://api.whatsapp.com/send?text='+titleTextUrl, //nativ: url: ({titleTextUrl}) => 'whatsapp://send?text='+titleTextUrl,
    svg:'<svg width="90" height="90" viewBox="0 0 90 90"><path d="M90 43.84c0 24.2-19.78 43.84-44.18 43.84-7.75 0-15.03-1.98-21.36-5.45L0 90l7.97-23.52c-4.02-6.6-6.33-14.36-6.33-22.64C1.64 19.64 21.4 0 45.8 0S90 19.63 90 43.84zM45.82 6.98c-20.5 0-37.15 16.54-37.15 36.86 0 8.07 2.63 15.53 7.08 21.6l-4.64 13.7 14.3-4.54c5.9 3.85 12.9 6.1 20.5 6.1C66.3 80.7 83 64.17 83 43.84S66.3 6.98 45.8 6.98zm22.3 46.96c-.26-.45-.98-.72-2.07-1.26-1.08-.53-6.4-3.13-7.4-3.5-1-.35-1.7-.53-2.43.55-.73 1.07-2.8 3.5-3.43 4.2-.7.73-1.3.82-2.4.28-1.1-.5-4.6-1.6-8.7-5.3-3.28-2.8-5.4-6.3-6.08-7.4-.64-1.1-.07-1.63.47-2.2.5-.5 1.1-1.22 1.63-1.9.56-.6.74-1.03 1.1-1.8.36-.7.18-1.3-.1-1.83-.26-.54-2.43-5.83-3.33-8C34.5 23.63 33.6 24 33 24c-.63 0-1.35-.1-2.07-.1-.7 0-1.9.27-2.9 1.34-1 1.1-3.76 3.7-3.76 8.97 0 5.3 3.88 10.4 4.42 11.1.52.7 7.47 11.9 18.5 16.2 11 4.3 11 2.9 13 2.7 1.96-.2 6.4-2.6 7.3-5.1.9-2.5.9-4.64.62-5.1z"/></svg>',
});
share.items.set('LinkedIn',{
    url: ({title,text,url}) =>  'https://www.linkedin.com/shareArticle?mini=true&url='+url+'&title='+title+'&summary='+text,
    svg:'<svg width="90" height="90" viewBox="0 0 24 24"><path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.73a1.76 1.76 0 1 1 0-3.53c.97 0 1.75.8 1.75 1.77S7.47 6.73 6.5 6.73zM20 19h-3v-5.6c0-3.37-4-3.12-4 0V19h-3V8h3v1.76a3.8 3.8 0 0 1 7 2.48V19z"/></svg>',
});

if (!navigator.share) navigator.share = share;
window.u1Share = share;


const enc = encodeURIComponent;

const style =
'<style>'+
'.c1Share {'+
    'width:100%;'+
    'max-width:40rem;'+
    'bottom:0; top:auto;'+
    'border:0; padding:0;'+
    'text-align:center;'+
    'transition:.2s;'+
    'transform:translateY(100%);'+
    'font-size:14px;'+
'}'+
'.c1Share.-Open {'+
    'transform:translateY(0)'+
'}'+
'.c1Share::backdrop {'+
    'opacity:0;transition:.2s;'+
'}'+
'.c1Share.-Open::backdrop {'+
    'opacity:1;'+
'}'+
'.c1Share > * {'+
    'padding:.5rem;'+
'}'+
'.c1Share .-body {'+
    'display:grid;'+
    'grid-gap: .5rem;'+
    'grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr) );'+
    'max-height:50vh;'+
    'overflow:auto;'+
'}'+
'.c1Share .-body > a {'+
    'display:flex;'+
    'justify-content: center;'+
    'flex-flow:column;'+
    'text-align:center;'+
    'background:#eee;'+
    'padding:1rem;'+
    'transition:.2s;'+
    'color:inherit;'+
    'text-decoration:none'+
'}'+
'.c1Share .-body > a:hover {'+
    'background:#ddd;'+
'}'+
'.c1Share .-body > a > svg {'+
    'display:block;'+
    'height:2rem;'+
    'margin:0 auto 10px auto;'+
'}'+
'</style>';



// thanks: https://github.com/on2-dev/share-api-polyfill/blob/main/src/share.js
const languages = {
    cs: {
        shareTitle: 'Sdílet',
        //cancel: 'Zrušit',
        Copy: 'Kopírovat',
        //print: 'Tisk',
        //selectSms: 'Vyberte kontakt'
    },
    sk: {
        shareTitle: 'Zdieľať',
        //cancel: 'Zrušiť',
        Copy: 'Kopírovat',
        //print: 'Tlač',
        //selectSms: 'Vyberte kontakt'
    },
    ja: {
        shareTitle: '共有する',
        //cancel: 'キャンセル',
        Copy: 'コピーする',
        //print: '印刷する',
        //selectSms: '連絡先を選択してください'
    },
    zh: {
        shareTitle: '分享',
        //cancel: '取消',
        Copy: '複製連結',
        //print: '列印',
        //selectSms: '選擇聯絡人'
    },
    pt: {
        shareTitle: 'Compartilhar',
        //cancel: 'Cancelar',
        Copy: 'Copiar',
        //print: 'Imprimir',
        //selectSms: 'Selecione um contato'
    },
    en: {
        shareTitle: 'Share',
        //cancel: 'Cancel',
        Copy: 'Copy',
        //print: 'Print',
        //selectSms: 'Pick a contact'
    },
    es: {
        shareTitle: 'Compartir',
        //cancel: 'Cancelar',
        Copy: 'Copiar',
        //print: 'Imprimir',
        'E-Mail': 'Correo',
        //selectSms: 'Seleccionar un contacto'
    },
    fr: {
        shareTitle: 'Partager',
        //cancel: 'Annuler',
        Copy: 'Copier',
        //print: 'Imprimer',
        //selectSms: 'Veuillez choisir un contact'
    },
    de: {
        shareTitle: 'Teilen',
        //cancel: 'Abbrechen',
        Copy: 'Kopieren',
        //print: 'Drucken',
        //selectSms: 'Wählen Sie einen Kontakt aus'
    },
    it: {
        shareTitle: 'Condividi',
        //cancel: 'Annulla',
        Copy: 'Copia',
        //print: 'Stampa',
        'E-Mail': 'Email',
        //selectSms: 'Seleziona un contatto'
    },
    nl: {
        shareTitle: 'Delen',
        //cancel: 'Annuleren',
        Copy: 'Kopiëren',
        //print: 'Printen',
        //selectSms: 'Selecteer een contact'
    },
    sv: {
        shareTitle: 'Dela',
        //cancel: 'Avbryt',
        Copy: 'Kopiera',
        //print: 'Skriv ut',
        //selectSms: 'Välj en kontakt'
    },
    da: {
        shareTitle: 'Del',
        //cancel: 'Luk',
        Copy: 'Kopiér',
        //print: 'Udskriv',
        //selectSms: 'Vælg en kontaktperson'
    },
    ru: {
        shareTitle: 'Поделиться',
        //cancel: 'Отмена',
        Copy: 'Скопировать',
        //print: 'Печать',
        'E-Mail': 'Э-майл',
        //selectSms: 'Выбери контакт'
    },
    tr: {
        shareTitle: 'Paylaş',
        //cancel: 'Vazgeç',
        Copy: 'Kopyala',
        //print: 'Yazdır',
        'E-Mail': 'E-posta',
        //selectSms: 'Bir kişi seç'
    },
    ko: {
        shareTitle: '공유',
        //cancel: '취소',
        Copy: '링크 복사',
        //print: '인쇄',
        //selectSms: '연락처를 선택하세요'
    },
    ta: {
        shareTitle: 'பகிர்',
        //cancel: 'இரத்து',
        Copy: 'நகலெடு',
        //print: 'அச்சிடு',
        'E-Mail': 'மின்னஞ்சல்',
        //selectSms: 'ஒரு தொடர்பைத் தேர்வுசெய்க'
    },
    pl: {
        shareTitle: 'Dzielić',
        //cancel: 'Anuluj',
        Copy: 'Kopiuj',
        //print: 'Wydrukować',
        //selectSms: 'Wybierz kontakt'
    },
    is: {
        shareTitle: 'Deila',
        //cancel: 'Hætta við',
        Copy: 'Afrita',
        //print: 'Prenta',
        'E-Mail': 'Póstur',
        //selectSms: 'Veldu tengilið'
    },
    hu: {
        shareTitle: 'Megosztás',
        //cancel: 'Bezárás',
        Copy: 'Másolás',
        //print: 'Nyomtatás',
        //selectSms: 'Válasszon egy kontaktot'
    },
};

const lang = navigator.language.substr(0, 2).toLowerCase();
const txt = languages[lang] || languages['en'];

}();
