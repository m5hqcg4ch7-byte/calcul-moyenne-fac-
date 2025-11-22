<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2685.2">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">// Stockage global des données. Les données sont persistantes grâce à localStorage.</p>
<p class="p1">let gradesData = [];</p>
<p class="p2"><br></p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p1">/* --- Fonctions de Nettoyage et Persistance --- */</p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p2"><br></p>
<p class="p1">/** Sauvegarde les données dans le localStorage. */</p>
<p class="p1">function saveData() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>localStorage.setItem('gradesData', JSON.stringify(gradesData));</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">/** Charge les données depuis le localStorage. */</p>
<p class="p1">function loadData() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const storedData = localStorage.getItem('gradesData');</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (storedData) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>gradesData = JSON.parse(storedData);</p>
<p class="p1"><span class="Apple-converted-space">        </span>renderAll();</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">/** Supprime toutes les données et recharge la page. */</p>
<p class="p1">function clearAllData() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (confirm("Êtes-vous sûr de vouloir tout effacer ? Cette action est irréversible.")) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>localStorage.removeItem('gradesData');</p>
<p class="p1"><span class="Apple-converted-space">        </span>gradesData = [];</p>
<p class="p1"><span class="Apple-converted-space">        </span>document.getElementById('semestres-container').innerHTML = '';</p>
<p class="p1"><span class="Apple-converted-space">        </span>calculateAverages(); // Réinitialise l'affichage</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p2"><br></p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p1">/* --- Fonctions de Navigation dans les Données --- */</p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p2"><br></p>
<p class="p1">function findSemestre(semestreId) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>return gradesData.find(s =&gt; s.id === semestreId);</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function findBloc(semestreId, blocId) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const s = findSemestre(semestreId);</p>
<p class="p1"><span class="Apple-converted-space">    </span>return s ? s.blocks.find(b =&gt; b.id === blocId) : null;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function findMatiere(semestreId, blocId, matiereId) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const b = findBloc(semestreId, blocId);</p>
<p class="p1"><span class="Apple-converted-space">    </span>return b ? b.matieres.find(m =&gt; m.id === matiereId) : null;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p2"><br></p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p1">/* --- Fonctions de Calcul de Moyenne (Le Cœur) --- */</p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p2"><br></p>
<p class="p1">function calculateAverages() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>let annualTotalValue = 0;</p>
<p class="p1"><span class="Apple-converted-space">    </span>let annualTotalCoeff = 0;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>gradesData.forEach(semestre =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">        </span>let semestreTotalValue = 0;</p>
<p class="p1"><span class="Apple-converted-space">        </span>let semestreTotalCoeff = 0;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>semestre.blocks.forEach(bloc =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">            </span>let blocTotalValue = 0;</p>
<p class="p1"><span class="Apple-converted-space">            </span>let blocTotalCoeff = 0;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>bloc.matieres.forEach(matiere =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">                </span>let matiereTotalValue = 0;</p>
<p class="p1"><span class="Apple-converted-space">                </span>let matiereTotalCoeff = 0;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">                </span>// 1. Calcul de la moyenne de la Matière</p>
<p class="p1"><span class="Apple-converted-space">                </span>matiere.notes.forEach(note =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">                    </span>matiereTotalValue += note.grade * note.coefficient;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>matiereTotalCoeff += note.coefficient;</p>
<p class="p1"><span class="Apple-converted-space">                </span>});</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">                </span>matiere.average = matiereTotalCoeff &gt; 0 ? matiereTotalValue / matiereTotalCoeff : null;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">                </span>// 2. Accumulation pour le Bloc</p>
<p class="p1"><span class="Apple-converted-space">                </span>if (matiere.average !== null) {</p>
<p class="p1"><span class="Apple-converted-space">                    </span>blocTotalValue += matiere.average * matiere.coefficient;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>blocTotalCoeff += matiere.coefficient;</p>
<p class="p1"><span class="Apple-converted-space">                </span>}</p>
<p class="p1"><span class="Apple-converted-space">            </span>});</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>// 3. Calcul de la moyenne du Bloc</p>
<p class="p1"><span class="Apple-converted-space">            </span>bloc.average = blocTotalCoeff &gt; 0 ? blocTotalValue / blocTotalCoeff : null;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>// 4. Accumulation pour le Semestre</p>
<p class="p1"><span class="Apple-converted-space">            </span>if (bloc.average !== null) {</p>
<p class="p1"><span class="Apple-converted-space">                </span>semestreTotalValue += bloc.average * bloc.coefficient;</p>
<p class="p1"><span class="Apple-converted-space">                </span>semestreTotalCoeff += bloc.coefficient;</p>
<p class="p1"><span class="Apple-converted-space">            </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>// Mise à jour de l'affichage du Bloc</p>
<p class="p1"><span class="Apple-converted-space">            </span>const blocAvgEl = document.querySelector(`.bloc-card[data-bloc-id="${bloc.id}"] .bloc-average`);</p>
<p class="p1"><span class="Apple-converted-space">            </span>if (blocAvgEl) blocAvgEl.textContent = bloc.average !== null ? bloc.average.toFixed(2) : '--';</p>
<p class="p1"><span class="Apple-converted-space">        </span>});</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>// 5. Calcul de la moyenne du Semestre</p>
<p class="p1"><span class="Apple-converted-space">        </span>semestre.average = semestreTotalCoeff &gt; 0 ? semestreTotalValue / semestreTotalCoeff : null;</p>
<p class="p2"><span class="Apple-converted-space">        </span></p>
<p class="p1"><span class="Apple-converted-space">        </span>// 6. Accumulation pour la moyenne Annuelle</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (semestre.average !== null) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>annualTotalValue += semestre.average * semestre.coefficient;</p>
<p class="p1"><span class="Apple-converted-space">            </span>annualTotalCoeff += semestre.coefficient;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>// Mise à jour de l'affichage du Semestre</p>
<p class="p1"><span class="Apple-converted-space">        </span>const semestreAvgEl = document.querySelector(`.semestre-card[data-semestre-id="${semestre.id}"] .semestre-average`);</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (semestreAvgEl) semestreAvgEl.textContent = semestre.average !== null ? semestre.average.toFixed(2) : '--';</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>// 7. Calcul de la Moyenne Générale Annuelle</p>
<p class="p1"><span class="Apple-converted-space">    </span>const annualAverage = annualTotalCoeff &gt; 0 ? annualTotalValue / annualTotalCoeff : null;</p>
<p class="p2"><span class="Apple-converted-space">    </span></p>
<p class="p1"><span class="Apple-converted-space">    </span>// Mise à jour de l'affichage Global</p>
<p class="p1"><span class="Apple-converted-space">    </span>const annualAvgEl = document.getElementById('annual-average');</p>
<p class="p1"><span class="Apple-converted-space">    </span>annualAvgEl.textContent = annualAverage !== null ? annualAverage.toFixed(2) : '0.00';</p>
<p class="p2"><span class="Apple-converted-space">    </span></p>
<p class="p1"><span class="Apple-converted-space">    </span>updateMention(annualAverage);</p>
<p class="p1"><span class="Apple-converted-space">    </span>saveData();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">/** Affiche le statut de la mention. */</p>
<p class="p1">function updateMention(average) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const mentionEl = document.getElementById('mention-display');</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (average === null || average === 0) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>mentionEl.textContent = 'Statut : Non calculé';</p>
<p class="p1"><span class="Apple-converted-space">        </span>return;</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>let mention = 'Admis';</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (average &gt;= 16) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>mention = 'Très Bien (TB) 🌟';</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if (average &gt;= 14) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>mention = 'Bien (B)';</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if (average &gt;= 12) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>mention = 'Assez Bien (AB)';</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if (average &lt; 10) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>mention = 'Ajourné / Rattrapage 😔';</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>mentionEl.textContent = `Mention estimée : ${mention}`;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p2"><br></p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p1">/* --- Fonctions de Création et d'Interaction (UI) --- */</p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p2"><br></p>
<p class="p1">/** Ajoute une Note à une Matière. */</p>
<p class="p1">function addNote(semestreId, blocId, matiereId) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const matiere = findMatiere(semestreId, blocId, matiereId);</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!matiere) return;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>let grade = parseFloat(prompt("Note obtenue (entre 0 et 20) :", "10"));</p>
<p class="p1"><span class="Apple-converted-space">    </span>let coeff = parseFloat(prompt("Coefficient de cette note (ex: 0.4 pour 40%) :", "1"));</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>if (isNaN(grade) || isNaN(coeff) || grade &lt; 0 || grade &gt; 20 || coeff &lt;= 0) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>alert("Saisie invalide. Veuillez entrer une note (0-20) et un coefficient (&gt; 0).");</p>
<p class="p1"><span class="Apple-converted-space">        </span>return;</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>matiere.notes.push({ id: Date.now(), grade: grade, coefficient: coeff });</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>// Reconstruire l'affichage des notes et recalculer</p>
<p class="p1"><span class="Apple-converted-space">    </span>const notesContainer = document.querySelector(`.notes-list[data-matiere-id="${matiereId}"]`);</p>
<p class="p1"><span class="Apple-converted-space">    </span>notesContainer.innerHTML = createNoteListHTML(matiere.notes);</p>
<p class="p1"><span class="Apple-converted-space">    </span>calculateAverages();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">/** Ajoute une Matière à un Bloc. */</p>
<p class="p1">function addMatiere(semestreId, blocId) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const bloc = findBloc(semestreId, blocId);</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!bloc) return;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const matiereName = prompt("Nom de la Matière (ex: CM Droit des Contrats) :");</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!matiereName) return;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>let matiereCoeff = parseFloat(prompt(`Coefficient de "${matiereName}" pour le Bloc :`, '1'));</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (isNaN(matiereCoeff) || matiereCoeff &lt;= 0) matiereCoeff = 1;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const matiereId = Date.now();</p>
<p class="p1"><span class="Apple-converted-space">    </span>const newMatiere = {</p>
<p class="p1"><span class="Apple-converted-space">        </span>id: matiereId,</p>
<p class="p1"><span class="Apple-converted-space">        </span>name: matiereName,</p>
<p class="p1"><span class="Apple-converted-space">        </span>coefficient: matiereCoeff,</p>
<p class="p1"><span class="Apple-converted-space">        </span>average: null,</p>
<p class="p1"><span class="Apple-converted-space">        </span>notes: []</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">    </span>bloc.matieres.push(newMatiere);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const matieresContainer = document.querySelector(`.matieres-container[data-bloc-id="${blocId}"]`);</p>
<p class="p1"><span class="Apple-converted-space">    </span>matieresContainer.insertAdjacentHTML('beforeend', createMatiereElement(semestreId, blocId, newMatiere));</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>attachMatiereListeners(semestreId, blocId, matiereId);</p>
<p class="p1"><span class="Apple-converted-space">    </span>saveData();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">/** Ajoute un Bloc à un Semestre. */</p>
<p class="p1">function addBloc(semestreId) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const semestre = findSemestre(semestreId);</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!semestre) return;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const blocName = prompt("Nom du Bloc (ex: UE Fondamentale 1) :");</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!blocName) return;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>let blocCoeff = parseFloat(prompt(`Coefficient du bloc "${blocName}" pour le Semestre :`, '1'));</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (isNaN(blocCoeff) || blocCoeff &lt;= 0) blocCoeff = 1;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const blocId = Date.now();</p>
<p class="p1"><span class="Apple-converted-space">    </span>const newBloc = {</p>
<p class="p1"><span class="Apple-converted-space">        </span>id: blocId,</p>
<p class="p1"><span class="Apple-converted-space">        </span>name: blocName,</p>
<p class="p1"><span class="Apple-converted-space">        </span>coefficient: blocCoeff,</p>
<p class="p1"><span class="Apple-converted-space">        </span>average: null,</p>
<p class="p1"><span class="Apple-converted-space">        </span>matieres: []</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">    </span>semestre.blocks.push(newBloc);</p>
<p class="p2"><span class="Apple-converted-space">    </span></p>
<p class="p1"><span class="Apple-converted-space">    </span>const blocsContainer = document.querySelector(`.blocs-container[data-semestre-id="${semestreId}"]`);</p>
<p class="p1"><span class="Apple-converted-space">    </span>blocsContainer.insertAdjacentHTML('beforeend', createBlocElement(semestreId, newBloc));</p>
<p class="p2"><span class="Apple-converted-space">    </span></p>
<p class="p1"><span class="Apple-converted-space">    </span>attachBlocListeners(semestreId, blocId);</p>
<p class="p1"><span class="Apple-converted-space">    </span>saveData();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">/** Ajoute un Semestre. */</p>
<p class="p1">function addSemestre() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const semestreId = Date.now();</p>
<p class="p1"><span class="Apple-converted-space">    </span>const semestreName = prompt("Nom du Semestre (ex: S1, Année 1) :", `Semestre ${gradesData.length + 1}`);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!semestreName) return;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>let semestreCoeff = parseFloat(prompt(`Coefficient du Semestre pour la moyenne annuelle :`, '1'));</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (isNaN(semestreCoeff) || semestreCoeff &lt;= 0) semestreCoeff = 1;</p>
<p class="p2"><br></p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const newSemestre = {</p>
<p class="p1"><span class="Apple-converted-space">        </span>id: semestreId,</p>
<p class="p1"><span class="Apple-converted-space">        </span>name: semestreName,</p>
<p class="p1"><span class="Apple-converted-space">        </span>coefficient: semestreCoeff,</p>
<p class="p1"><span class="Apple-converted-space">        </span>average: null,</p>
<p class="p1"><span class="Apple-converted-space">        </span>blocks: []</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">    </span>gradesData.push(newSemestre);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('semestres-container').insertAdjacentHTML('beforeend', createSemestreElement(newSemestre));</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>attachSemestreListeners(semestreId);</p>
<p class="p1"><span class="Apple-converted-space">    </span>saveData();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p1">/* --- Fonctions de Suppression --- */</p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p2"><br></p>
<p class="p1">function deleteElement(type, sId, bId, mId) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!confirm(`Voulez-vous vraiment supprimer cet élément ?`)) return;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>if (type === 'semestre') {</p>
<p class="p1"><span class="Apple-converted-space">        </span>gradesData = gradesData.filter(s =&gt; s.id !== sId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>document.querySelector(`.semestre-card[data-semestre-id="${sId}"]`).remove();</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if (type === 'bloc') {</p>
<p class="p1"><span class="Apple-converted-space">        </span>const s = findSemestre(sId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (s) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>s.blocks = s.blocks.filter(b =&gt; b.id !== bId);</p>
<p class="p1"><span class="Apple-converted-space">            </span>document.querySelector(`.bloc-card[data-bloc-id="${bId}"]`).remove();</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if (type === 'matiere') {</p>
<p class="p1"><span class="Apple-converted-space">        </span>const b = findBloc(sId, bId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (b) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>b.matieres = b.matieres.filter(m =&gt; m.id !== mId);</p>
<p class="p1"><span class="Apple-converted-space">            </span>document.querySelector(`.matiere-details[data-matiere-id="${mId}"]`).remove();</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>} else if (type === 'note') {</p>
<p class="p1"><span class="Apple-converted-space">        </span>const m = findMatiere(sId, bId, mId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>if (m) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>m.notes = m.notes.filter(n =&gt; n.id !== bId); // bId est l'ID de la note ici</p>
<p class="p1"><span class="Apple-converted-space">            </span>// Reconstruire l'affichage des notes</p>
<p class="p1"><span class="Apple-converted-space">            </span>const notesContainer = document.querySelector(`.notes-list[data-matiere-id="${mId}"]`);</p>
<p class="p1"><span class="Apple-converted-space">            </span>notesContainer.innerHTML = createNoteListHTML(m.notes);</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>calculateAverages();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p2"><br></p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p1">/* --- Fonctions de Rendu HTML (Reconstruction de l'UI) --- */</p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p2"><br></p>
<p class="p1">function createNoteListHTML(notes) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>return notes.map(note =&gt; `</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;div class="note-item"&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>Note: ${note.grade.toFixed(2)} / Coeff: ${note.coefficient}</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;button class="danger-btn delete-note-btn"<span class="Apple-converted-space"> </span></p>
<p class="p1"><span class="Apple-converted-space">                </span>data-note-id="${note.id}"&gt;X&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>`).join('');</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function createMatiereElement(semestreId, blocId, matiere) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>return `</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;div class="matiere-details" data-semestre-id="${semestreId}" data-bloc-id="${blocId}" data-matiere-id="${matiere.id}"&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;h5&gt;${matiere.name} (Coeff: ${matiere.coefficient})&lt;/h5&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;p&gt;Moyenne: &lt;span class="matiere-average"&gt;${matiere.average !== null ? matiere.average.toFixed(2) : '--'}&lt;/span&gt;&lt;/p&gt;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;div class="notes-list" data-matiere-id="${matiere.id}"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>${createNoteListHTML(matiere.notes)}</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/div&gt;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;button class="primary-btn add-note-btn" data-matiere-id="${matiere.id}"&gt;+ Ajouter une Note&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;button class="danger-btn delete-matiere-btn" data-matiere-id="${matiere.id}"&gt;Supprimer Matière&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>`;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function createBlocElement(semestreId, bloc) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const matieresHTML = bloc.matieres.map(m =&gt; createMatiereElement(semestreId, bloc.id, m)).join('');</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>return `</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;div class="bloc-card" data-semestre-id="${semestreId}" data-bloc-id="${bloc.id}"&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;h4&gt;${bloc.name} (Coeff: ${bloc.coefficient})&lt;/h4&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;p&gt;Moyenne du Bloc: &lt;span class="bloc-average"&gt;${bloc.average !== null ? bloc.average.toFixed(2) : '--'}&lt;/span&gt;&lt;/p&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;button class="primary-btn add-matiere-btn" data-bloc-id="${bloc.id}"&gt;+ Ajouter une Matière&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;button class="danger-btn delete-bloc-btn" data-bloc-id="${bloc.id}"&gt;Supprimer Bloc&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;div class="matieres-container" data-bloc-id="${bloc.id}"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>${matieresHTML}</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>`;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function createSemestreElement(semestre) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const blocsHTML = semestre.blocks.map(b =&gt; createBlocElement(semestre.id, b)).join('');</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>return `</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;div class="semestre-card" data-semestre-id="${semestre.id}"&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;h3&gt;${semestre.name} (Coeff: ${semestre.coefficient})&lt;/h3&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;p&gt;Moyenne du Semestre: &lt;span class="semestre-average"&gt;${semestre.average !== null ? semestre.average.toFixed(2) : '--'}&lt;/span&gt;&lt;/p&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;button class="primary-btn add-bloc-btn" data-semestre-id="${semestre.id}"&gt;+ Ajouter un Bloc (UE)&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;button class="danger-btn delete-semestre-btn" data-semestre-id="${semestre.id}"&gt;Supprimer Semestre&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;div class="blocs-container" data-semestre-id="${semestre.id}"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>${blocsHTML}</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>`;</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">/** Reconstruit toute l'interface à partir de gradesData. */</p>
<p class="p1">function renderAll() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const container = document.getElementById('semestres-container');</p>
<p class="p1"><span class="Apple-converted-space">    </span>container.innerHTML = gradesData.map(createSemestreElement).join('');</p>
<p class="p1"><span class="Apple-converted-space">    </span>attachAllListeners();</p>
<p class="p1"><span class="Apple-converted-space">    </span>calculateAverages();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p2"><br></p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p1">/* --- Gestion des Événements --- */</p>
<p class="p1">/* ------------------------------------------- */</p>
<p class="p2"><br></p>
<p class="p1">function getParentIds(target) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const matiereEl = target.closest('.matiere-details');</p>
<p class="p1"><span class="Apple-converted-space">    </span>const blocEl = target.closest('.bloc-card');</p>
<p class="p1"><span class="Apple-converted-space">    </span>const semestreEl = target.closest('.semestre-card');</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>return {</p>
<p class="p1"><span class="Apple-converted-space">        </span>sId: semestreEl ? parseFloat(semestreEl.dataset.semestreId) : null,</p>
<p class="p1"><span class="Apple-converted-space">        </span>bId: blocEl ? parseFloat(blocEl.dataset.blocId) : null,</p>
<p class="p1"><span class="Apple-converted-space">        </span>mId: matiereEl ? parseFloat(matiereEl.dataset.matiereId) : null</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function attachAllListeners() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const container = document.getElementById('semestres-container');</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>// Délégation d'événements pour les boutons créés dynamiquement</p>
<p class="p1"><span class="Apple-converted-space">    </span>container.addEventListener('click', (event) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">        </span>const target = event.target;</p>
<p class="p1"><span class="Apple-converted-space">        </span>const { sId, bId, mId } = getParentIds(target);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>if (target.classList.contains('add-bloc-btn')) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>addBloc(sId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>} else if (target.classList.contains('add-matiere-btn')) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>addMatiere(sId, bId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>} else if (target.classList.contains('add-note-btn')) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>addNote(sId, bId, mId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>} else if (target.classList.contains('delete-semestre-btn')) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>deleteElement('semestre', sId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>} else if (target.classList.contains('delete-bloc-btn')) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>deleteElement('bloc', sId, bId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>} else if (target.classList.contains('delete-matiere-btn')) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>deleteElement('matiere', sId, bId, mId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>} else if (target.classList.contains('delete-note-btn')) {</p>
<p class="p1"><span class="Apple-converted-space">            </span>const noteId = parseFloat(target.dataset.noteId);</p>
<p class="p1"><span class="Apple-converted-space">            </span>deleteElement('note', sId, bId, mId, noteId);</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">/** Initialisation de l'application. */</p>
<p class="p1">document.addEventListener('DOMContentLoaded', () =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>// Écouteurs pour les boutons de haut niveau</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('add-semestre-btn').addEventListener('click', addSemestre);</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('clear-all-btn').addEventListener('click', clearAllData);</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>// Charger les données sauvegardées et construire l'interface</p>
<p class="p1"><span class="Apple-converted-space">    </span>loadData();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>// Si aucune donnée n'est chargée, lance un premier calcul pour initialiser l'affichage</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (gradesData.length === 0) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>calculateAverages();</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1">});</p>
</body>
</html>
