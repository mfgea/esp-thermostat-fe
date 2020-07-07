(function (d, domain, indexFile) {
    const b = d.body;
    const isLocal = url => url.test(/\blocalhost\b/) || url.test(/\b\d+\.\d+\.\d+\.\d+\b/);
    const replace = url => isLocal(url) ? url.replace(/^https?:\/\/[^/]*/, domain) : url;
    function link(e) {
        if(e.rel === 'manifest') {
            d.querySelector('#manifest').setAttribute('href', e.href);
        } else {
            let l = d.createElement('link');
            l.setAttribute('href', replace(e.href));
            l.setAttribute('rel', e.rel);
            b.appendChild(l);
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
            dom.querySelectorAll('link').forEach(e => link(e));
            dom.querySelectorAll('script').forEach(e => script(e));
            d.title = dom.title;
        });
})(document, window.remoteDomain, window.remoteIndexFile);