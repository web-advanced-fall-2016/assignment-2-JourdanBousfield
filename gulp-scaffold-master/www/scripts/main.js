/* eslint-env es6 */
(function() {
    let baseURL = 'http://148.75.251.185:8888';
    if (document.readyState != "loading") {
        app();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            app();
        }, false);
    }

    function getStudents() {
        let config = {
            method: 'GET',
            headers: new Headers({}),
        };

        let request = new Request(`${baseURL}/students`, config);
        fetch(request)
            .then(function(res) {
                if (res.status == 200)
                    return res.json();
            })
            .then(function(res) {
                for (let student of res) {
                    let request = new Request(`${baseURL}/students/${student.id}`, config);
                    fetch(request)
                        .then(function(res) {
                            if (res.status == 200)
                                return res.json();
                        })
                        .then(function(res) {
                            populateStudent(res);
                        })
                        .catch(function(err) {
                            console.warn(`Couldn't fetch a student!`);
                            console.log(err);
                        });
                }
            })
            .catch(function(err) {
                console.warn(`Couldn't fetch students list`);
                console.log(err);
            });
    }

    function populateStudent(student) {
            let studentTemplate = document.createElement('div');
            studentTemplate.classList.add('person');
            studentTemplate.innerHTML = `
                                    <div class="thumb">
                                        <img src="${baseURL}${student.profile_picture}">
                                    </div>
                                    <div class="description">${student.excerpt}</div>
                                    <div class="info">
                                        <span>${student.first_name} ${student.last_name} </span>
                                        <nav class="social">
                                        ${(links => {
                                            let result = '';
                                            for(let link of links){
                                                let icon = "";
                                                if( /github.com/.test(link.url) ){
                                                    icon = "svg/github.svg";
                                                }else if(/linkedin.com/.test(link.url) ){
                                                    icon = "svg/linkedin.svg";
                                                }else if (/instagram.com/.test(link.url) ){
                                                    icon = "svg/instagram.svg";
                                                }
                                                let linkTemplate = `<a target="_blank" href ="${link.url}"><img src = "${icon}"></a>`;
                                                result +=  linkTemplate;
                                            }
                                            return result;
                                        })(student.links)} 
                                        </nav> 
                                    </div>`;
            let mainWrapper = document.getElementById('main');
            mainWrapper.appendChild(studentTemplate);
        }

    function app() {
        getStudents();
    
    }
})();