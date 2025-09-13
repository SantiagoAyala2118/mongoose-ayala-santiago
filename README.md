 # **Practica De Crud BáSico Con Mongoose**
## Documento embebido y referenciado
- ***Documento embebido en el esquema de usuario:***Decidí usar el documento embebido en el esquema de usuario, justamente en el campo "favorite_games" debido a que me pareció que podía encajar de mejor manera gracias a las características propias del documento embebido, como ser que este se utiliza para información que solamente está relacionada con el documento padre, y que la relación que se maneja aquí es de uno a muchos.

- ***Referencia con perfil y grupo:*** Me pareció que con la "relación" entre estos modelos me vendría mejor que se referencien entre sí mediante un ObjectId. Ya que la información que comparten es completamente distinta, y en este caso se están manejando relaciones de uno a uno, con User y Profile, y relaciones de muchos a muchos, con User y Group. Además de que cada uno puede existir por separado sin necesidad del otro. O al menos en Mongo asi pasa.
