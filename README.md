# Calcul de surface d'eau maximale entre les batiments de Mr Archi TEKT
## _Logique de résolution_

L'objectif ici est de parcourir le tableau (hauteur de chaque bâtiment) et de déterminer l'eau piégée au-dessus de chaque bâtiment. Pour ce faire, nous devons trouver comment un bâtiment peut piéger l'eau.

Si nous regardons de près, l'eau ne peut être stockée que s'il y a des bâtiments plus hautes à gauche et à droite de la tour actuelle (pas nécessairement des bâtiments voisines). 
L'eau sera donc délimitée par les tours les plus hautes à droite et à gauche. 
La quantité d'eau ainsi est la différence entre le minimum des deux hauteurs maximales et la hauteur du bâtiment actuelle.

## Solution 1 (la plus simple)
Pour aborder ce problème comme nous l'avons déjà décrit, nous devons trouver la hauteur maximale à gauche et à droite de chaque tour. 

La première idée qui nous vient à l'esprit est donc de créer tout d'abord une boucle pour parcourir le tableau des hauteurs, puis de créer deux boucles imbriquées pour trouver la batiment la plus haute à gauche et à droite.

Pour ce faire, nous pouvons créer 2 variables maxLeft et maxRight pour stocker la valeur du batiment gauche/droite le plus élevé. et ensuite dans chaque boucle imbriquée mettre à jour la valeur correspondante à chaque fois par le max entre la hauteur actuelle dans le tableau avec la valeur de maxLeft/maxRight à dernière itération

Après avoir trouvé la hauteur maximale à droite et à gauche de chaque élément, nous pouvons maintenant trouver l'eau piégée dans cet élément en calculant la différence entre la tour la plus courte (entre les deux tours les plus hautes à gauche et à droite) et la hauteur de la tour actuelle.
```js
bruteForceSolution() {
    let result = 0;
    this.batiments.forEach((current, index) => {
      let maxLeft = 0,
        maxRight = 0;
      for (let j = index; j >= 0; j--)
        maxLeft = Math.max(maxLeft, this.batiments[j]);
      for (let j = index; j < this.batiments.length; j++)
        maxRight = Math.max(maxRight, this.batiments[j]);
      result += Math.min(maxLeft, maxRight) - current;
    });
    return result;
  }
 ```
### Compléxité 
Dans cette solution, nous avons un ensemble d'instructions et 3 boucles (2 d'entre elles sont imbriquées dans la troisième). La complexité temporelle est donc O(n²), n étant le nombre de bâtiments.
## Solution 2 (Optimale)

Dans cette solution, au lieu de créer des boucles imbriquées pour trouver les bâtiments les plus élevés à gauche et à droite de chaque bâtiment, nous pouvons utiliser 2 tableaux pour stocker les bâtiments les plus élevés à gauche et à droite dans l'index correspondant à l'index de chaque bâtiment.
Pour cela, nous pouvons simplement initier le premier élément du tableau contenant les éléments les plus élevés à gauche et initier le dernier élément de celui contenant les éléments les plus élevés à droite. 
```js
let maxLeftEachElement = [];
let maxRighEachElements = [];
maxLeftEachElement[0] = this.batiments[0];
maxRighEachElements[this.batiments.length - 1] = this.batiments[this.batiments.length - 1];
```
Plus tard, nous commencerons à remplir le premier tableau de gauche à droite et le deuxième tableau de droite à gauche. A chaque itération, nous stockons le maximum entre l'élément rempli précédent et le bâtiment du tableau initial avec l'indice courant.
```js
for (
      let i = 1, j = this.batiments.length - 2;
      i < this.batiments.length, j >= 0;
      i++, j--
    ) {
      maxLeftEachElement[i] = Math.max(
        this.batiments[i],
        maxLeftEachElement[i - 1]
      );
      maxRighEachElements[j] = Math.max(
        this.batiments[j],
        maxRighEachElements[j + 1]
      );
    }
```
Et pour trouver l'eau remplie pour chaque bâtiment, nous appliquons la même méthode que la dernière fois en soustrayant le minimum entre chaque élément du premier et du second tableau avec l'élément du tableau initial. Et enfin calculer la somme de toutes les surfaces remplies. 
```js
return maxLeftEachElement.reduce(
      (prev, curr, index) =>
        prev +
        Math.min(curr, maxRighEachElements[index]) -
        this.batiments[index],
      0
    );
```

Finalement on a
```js
  optimalSolution() {
    let maxLeftEachElement = [];
    let maxRighEachElements = [];
    maxLeftEachElement[0] = this.batiments[0];
    maxRighEachElements[this.batiments.length - 1] =
      this.batiments[this.batiments.length - 1];
    for (
      let i = 1, j = this.batiments.length - 2;
      i < this.batiments.length, j >= 0;
      i++, j--
    ) {
      maxLeftEachElement[i] = Math.max(
        this.batiments[i],
        maxLeftEachElement[i - 1]
      );
      maxRighEachElements[j] = Math.max(
        this.batiments[j],
        maxRighEachElements[j + 1]
      );
    }

    return maxLeftEachElement.reduce(
      (prev, curr, index) =>
        prev +
        Math.min(curr, maxRighEachElements[index]) -
        this.batiments[index],
      0
    );
  }
```
### Compléxité 
Dans cette solution, nous avons éliminé l'utilisation de boucles imbriqués, on utilisé 3 boucle, 2 pour trouver les batiments élevés, et un dernier pour calculer la résultat finale donc la compléxité est O(n)+O(n)+O(n) = O(n) sachant que n est la taille du tableau (nombre des batiments).

## Cas de test
Pour tester l'API, nous avons utilisé POSTMAN pour faire les appels.
### Test 1 : tableau vide
![](https://i.ibb.co/b3Tpzjz/image.png)

### Test 2 : tableau simple
![](https://i.ibb.co/FssX4gV/image.png)

### Test 3 : tableau simple
![](https://i.ibb.co/qrfWh8M/image.png)

### Test 4 : tableau simple
![](https://i.ibb.co/Fxx3qt0/image.png)

### Test 4 : tableau complexe
![](https://i.ibb.co/yW4CWWw/image.png)

### Test 5 : tableau complexe
![](https://i.ibb.co/vqqtqLQ/image.png)
