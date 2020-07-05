(function (d, domain, indexFile) {
    let b = d.body;
    let replace = url => url.replace(/^https?:\/\/[^/]*/, domain);
    function link(e) {
        if(e.rel === 'manifest') {
            d.querySelector('#manifest').setAttribute('href', e.href);
        } else {
            b.appendChild(
                d.createElement('link').setAttribute('href', replace(e.href)).setAttribute('rel', e.rel)
            );
        }
    }
    function script(e) {
        let s = d.createElement('script');
        e.src ? s.setAttribute('src', replace(e.src)) : s.innerHTML = e.innerHTML;
        b.appendChild(s);
    }

    fetch(`${indexFile}`)
        .then(r => r.text())
        .then(txt => {
            let p = new DOMParser();
            let dom = p.parseFromString(txt, 'text/html');
            dom.querySelectorAll('link').map(e => link(e));
            dom.querySelectorAll('script').map(e => script(e));
            d.title = dom.title;
        });
})(document, window.remoteDomain, window.remoteIndexFile);