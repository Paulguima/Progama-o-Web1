document.addEventListener('DOMContentLoaded', () =>{

    const toggleMenu = () => {
        const menu = document.getElementById('navMenu');
        if(menu)menu.classList.toggle('active');
    };
    window.toggleMenu = toggleMenu;

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);

        if(!section)return;

        const headerHeight = 70;

        const sectionPosition = section.offsetTop - headerHeight;
        window.scrollTo({top: sectionPosition, behavior: 'smooth'});

        const menu = document.getElementById('navMenu');
        if (menu) menu.classList.remove('active');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById('VolunteerForm');
        if (!form)return;

        if (form.dataset.submitted === 'true')return ;
        form.dataset.submitted = 'true';

        const nome=form.nome.value.trim();
        const email=form.email.value.trim();

        if(!nome || !email ){
            alert('Por favor, preencha todos os campos obrigatórios.');
            form.dataset.submitted = 'false';
            return;
        }
            
        const formData = {
            nome,
            email,
            telefone: form.telefone.value.trim(),
            idade: form.idade.value.trim(),
            disponibilidade: form.disponibilidade.value.trim(),
            areaInteresse: form.areaInteresse.value.trim(),
            experiencia: form.experiencia.value.trim(),
            motivacao: form.motivacao.value.trim(),
            datacadastro: new Date().toLocaleString()
        };

        let vonlunrarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
        vonlunrarios.push(formData);
        localStorage.setItem('voluntarios', JSON.stringify(vonlunrarios));

        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.add('Show');
            successMessage.scrollIntoView({behavior: "smooth", block: "center"});
        }
            
        setTimeout(()=>successMessage.classList.remove('Show'), 5000);

        setTimeout(()=>{
            form.reset();
            form.dataset.submitted = 'false';
        }, 2000);

        exibirVoluntarios();
    };

    const form = document.getElementById('VolunteerForm');
    if(form) form.addEventListener('submit', handleSubmit);


    const exibirVoluntarios = () => {
        const voluntarios= JSON.parse(localStorage.getItem('voluntarios')) || [];

        const tabelacontainer = document.getElementById('tabelaVoluntarios');

        if(!tabelacontainer)return;

        if(voluntarios.length === 0){
            tabelacontainer.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
            return;
        }

        let html = 'tablee border="1" cellpadding="5" cellspacing="0"
        html += '<tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Idade</th><th>Disponibilidade</th><th>Área de Interesse</th><th>Experiência Prévia</th><th>Motivação</th><th>Data de Cadastro</th></tr>';

        voluntarios.forEach(v => {
            html += `<tr>
                <td>${v.nome}</td>
                <td>${v.email}</td>
                <td>${v.telefone || '-'}</td>
                <td>${v.idade || '-'}</td>
                <td>${v.disponibilidade || '-'}</td>
                <td>${v.areaInteresse || '-'}</td>
                <td>${v.experiencia || '-'}</td>
                <td>${v.motivacao || '-'}</td>
                <td>${v.datacadastro || '-'}</td>
            </tr>`;
        });
   }


});




