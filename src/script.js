"use strict";

/**
 * Pjax extend - v0.1
 * @see https://github.com/arhitov/javascript-pjax-ext
 * @author Alexander Arhitov clgsru@gmail.com
 *
 * @param {URL} url
 */
const pjaxExt = (url) => {

    const appendParam = (name, value = '') => {
        url.searchParams.delete(name);
        url.searchParams.append(name, value);
    };

    function PjaxExt () {
        let onload = null;

        appendParam('pjax-ext');

        /**
         * Запрос требуемых секций
         * @param {string|Array} list
         * @return {PjaxExt}
         */
        this.setSection = list => {
            appendParam('section', list);
            return this;
        };

        /**
         * @param {function} callback
         */
        this.onload = callback => {
            onload = callback;
            return this;
        };

        this.load = () => {
            const promise = fetch(url.href, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            fetchJsonHandler(promise)
                /**
                 * @param {{section:Array}} data
                 */
                .then(data => {
                    if (data.answer.section) {
                        for (const [sectionName, sectionContent] of Object.entries(data.answer.section)) {
                            selectOrFail('[data-pjax-ext-section="' + sectionName + '"]')
                                .innerHTML = sectionContent;
                        }
                    }

                    if (onload) {
                        onload(data.answer);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        };
    }

    return new PjaxExt();
};
