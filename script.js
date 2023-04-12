const heures = [
    { id: 1, nom : '2H'},{ id: 2, nom : '3H'},{ id: 3, nom : '4H'}
   
];
const modules = [
    { id: 1, nom : 'JavaScript', semaine: '', planning: [[],[],[],[],[],[]]},
    { id: 2, nom : 'Python', semaine: '', planning: [[],[],[],[],[],[]]},
    { id: 3, nom : 'Java', semaine: '', planning: [[],[],[],[],[],[]]},
    { id: 4, nom : 'PHP', semaine: '', planning: [[],[],[],[],[],[]]},
    { id: 5, nom : 'C Sharp', semaine: '', planning: [[],[],[],[],[],[]]},
];
const enseignants = [
    { id:1, nom: 'Aly NIANG', semaine:'', planning:[[],[],[],[],[],[]], modules:[1,2,4] },
    { id:2, nom: 'WANE', semaine:'', planning:[[],[],[],[],[],[]], modules:[1,2,3,4] },
    { id:3, nom: 'NIASS', semaine:'', planning:[[],[],[],[],[],[]], modules:[1,4] },
    { id:4, nom: 'MBAYE', semaine:'', planning:[[],[],[],[],[],[]], modules:[5] },
    { id:5, nom: 'NDOYE', semaine:'', planning:[[],[],[],[],[],[]], modules:[3,4] },
];
const salles = [
    { id: 1, nom : 'en ligne', nbrPlaces: 100, semaine: '', planning: [[],[],[],[],[],[]]},
    { id: 2, nom : '102', nbrPlaces: 50, semaine: '', planning: [[],[],[],[],[],[]]},
    { id: 3, nom : '201', nbrPlaces: 20, semaine: '', planning: [[],[],[],[],[],[]]},
    { id: 4, nom : '201', nbrPlaces: 60, semaine: '', planning: [[],[],[],[],[],[]]},
];

const classe = {
    nom :' L3 GL',
    semaine : '13/02/2023 - 17/02/2023',
    effectif : 34,
    planning : [
        [
            // {module: 'Python', prof: 'Aly NIANG', duree: 3, debut: 9, salle:'201'},
            // {module: 'PHP', prof: 'Wane', duree: 4, debut: 13, salle:'101'},
        ],[],[],[],[],
        [
            // {module: 'Java', prof: 'NIASS', duree: 4, debut: 12, salle:'info'}
        ]
    ]


};
//!===================================The Items=================================
const colors = ['#da974b','#E8B01F','#DBCB89','#71BCF3','#E0474C','#7FB8B4','#B2B1B1','#9F4C9D','#0073BC'];
const cards = document.querySelectorAll('.card');
const select = document.querySelector("#select");

const divClasses = document.querySelector('#classes');
const divEnseignants = document.querySelector('#enseignants');
const divSalles = document.querySelector('#salles');

const addCours = document.querySelectorAll('.add-cours');
const selectModule = document.querySelector('#select_module');
const selectEnseignant = document.querySelector('#select_enseignant');
const selectDebut = document.querySelector('#select_debut');
const selectFin = document.querySelector('#select_fin');
const selectSalle = document.querySelector('#select_salle');
const errorModal = document.querySelector('.error-modal');
const btnSaveModal = document.querySelector('#save');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('#closeModal');
const closeModa = document.querySelector('.day-content');
let jour = 0;
const selects = document.getElementsByTagName('select')
//!===================================The Events=================================
chargerSelect(salles,selectSalle,'Choisir une Salle');

chargerSelect(enseignants,selectEnseignant,'Choisir un Enseignant');

chargerNbrHeure(2,5,selectFin);

chargerHeure(8,18,selectDebut);

chargerSelect(modules,selectModule,'Choisir un Module');

printPlanning();
btnSaveModal.addEventListener('click',()=>{
    const idModule = getSelectedValue(selectModule);
    const idProf = getSelectedValue(selectEnseignant);
    const idSalle = getSelectedValue(selectSalle);
    const idHeure = getSelectedValue(selectFin);
    const heureDebut = getSelectedValue(selectDebut);
    //
    classe.planning[jour].push({
        module: getNameByid(idModule,modules),
        prof: getNameByid(idProf,enseignants),
        salle: getNameByid(idSalle,salles),
        duree: idHeure,
        debut: heureDebut,
    })
    printPlanning();
    modal.classList.toggle('open');
    selectModule.value =0;
    selectEnseignant.value =0;
    selectSalle.value =0;
    selectFin.value =0;
    selectDebut.value =0;
 });
       //*close modal    
       closeModal.addEventListener('click',()=>{modal.classList.remove('open')});

    addCours.forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            jour = e.target.getAttribute('day') - 1;
            //*open modal
            modal.classList.toggle('open')
        } )
    });
    
    selectModule.addEventListener('change',()=>{
    const idModule = getSelectedValue(selectModule);
    const profs = getProfdByIdModule(idModule);
    chargerSelect(profs,selectEnseignant,'Choisir un Enseignant');
});
   
 //!===================================The Functions=================================
function conrol(params) {
    
}

function getProfdByIdModule(idModule){
    
    return enseignants.filter(e=>e.modules.includes(+idModule));
}
 

 function getNameByid(id,datas) {
    const d = datas.find(d=>d.id == id);
    return d.nom;
 }
 
 function getSelectedValue(select){
    return select.options[select.selectedIndex].value;
 }
function printPlanning() {
    cleanCours();
    classe.planning.forEach((p,i)=>{
        const jour = document.querySelector(`#day_${i+1}`);
        p.forEach(c =>{
            let posColor = Math.floor(Math.random() * colors.length);
            jour.appendChild(createDivCour(c.debut,c.duree,colors[posColor],c.module,c.prof,c.salle));
        });
    });
   
} 
function createDivCour(debut, duree,color,module,prof,salle){
    col = debut - 8 ;
    const div = document.createElement('div');
    div.className = 'cours';

    const spanDelete = document.createElement('span');
    spanDelete.innerText = 'X'
    spanDelete.className = 'delete-cours';

    const small1 = document.createElement('small');
    small1.innerText = prof;

    const small2 = document.createElement('small');
    small2.innerText = salle;

    const h3 = document.createElement('h3');
    h3.innerText = module;

    div.style.backgroundColor =color;
    div.style.width = `${duree * 7}%`;
    div.style.marginLeft = `${col * 7.5}%`;

    div.append(spanDelete,small1,h3,small2)
    return div;

}
function cleanCours(){
    const coursContents = document.querySelectorAll('.day-content');
    coursContents.forEach(cours =>{
        cours.innerHTML=''
    });
}
function chargerSelect(data,select,label){
    select.innerHTML = '';
    //
    const option = document.createElement('option');
    option.innerText = label;
    option.value = '0';
    select.appendChild(option);
    //
    data.forEach(d => {
        const option = document.createElement('option');
        option.innerText = d.nom;
        option.value = d.id;
        select.appendChild(option);
    });
}
function chargerHeure(min, max, select){
    select.innerHTML = '';
    const option = document.createElement('option');
    option.innerText = 'Choisir une Heure';
    option.value = '0';
    select.appendChild(option);
    for (let i = min; i <= max; i++) {
        const option = document.createElement('option');
        option.innerText = `${i} H`
        option.value = i;
        select.appendChild(option);
    }
}
function chargerNbrHeure(min,max,select) {
    select.value = '';
    const option = document.createElement('option');
    option.innerHTML = 'Choisir nombre d\'heures'
    option.value = '0';
    select.appendChild(option);
    for (let i = min; i < max; i++){
        const option = document.createElement('option');
        option.innerText = `${i} H de temps`
        option.value = i;
        select.appendChild(option)
    }

}


