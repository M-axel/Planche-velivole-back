# Planche-velivole-back
Backend d'un projet consistant à pratiquer le MERN stack. L'accent ne sera pas mis sur la gestion du projet (pas de découpage en itérations par exemple), ni sur le fait de créer quelque chose de réelement pertinent mais bien de travailler les concepts de React, Node + ~~Express~~ Fastify et MongoDB.

Le but est de créer une Single Page Application qui permet de remplacer les planches que l'on trouve dans les aéroclubs vélivoles, planches sur lequelles on inscrit tous les vols d'une journée (document qui permet, ulterieurement, la facturation en fonction du temps de remorquage et le temps passé dans la cellule du planeur).

## Liste des API

<table>
    <thead>
        <tr>
            <th>Type</th>
          <th>Chemin</th>
          <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>GET</td>
            <td>/api/planche/:pid</td>
          <td>Permet de récupérer une planche en fonction de son id (un objet Date)</td>
        </tr>
      <tr>
            <td>POST</td>
            <td>/api/planche/:pid/ligne/:lid</td>
          <td>Permet d'ajouter une ligne à un tableau grâce à l'id des deux.</td>
        </tr>
      <tr>
            <td>PATCH</td>
            <td>/api/planche/:pid/ligne/:lid</td>
          <td>Permet de modifier une ligne d'un tableau grâce à l'id des deux.</td>
        </tr>
      <tr>
            <td>DELETE</td>
            <td>/api/planche/:pid/ligne/:lid</td>
          <td>Permet de supprimer une ligne d'un tableau grâce à l'id des deux.</td>
        </tr>
    </tbody>
</table>

L'id de la planche à afficher (pid) est un objet date. Pour appeler l'API, il faut mettre cette date dans l'URL : on pourrait formater la date en un string 'YYYY-MM-DD' pour un question de lisibilité, mais puisque seul la machine va lire cette information, on va passer date.getTime().

## Credentials
Pour des raisons evidentes de sécurité, je n'ai pas donné en clair mes credentials d'accès/modification de la base de donnée.

``` const data = fs.readFileSync('../Credentials/credential_mongo_planches.txt', 'utf8'); ```

Dans `serveur.js` est recupéré un fichier qui contient l'username et le password au format username:passeword.
