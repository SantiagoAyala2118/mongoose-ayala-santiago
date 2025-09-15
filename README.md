# **Practica De Crud BáSico Con Mongoose**

## Documento embebido y referenciado

- **_Documento embebido en el esquema de usuario:_** Decidí usar el documento embebido en el esquema de usuario, justamente en el campo "favorite_games" debido a que me pareció que podía encajar de mejor manera gracias a las características propias del documento embebido, como ser que este se utiliza para información que solamente está relacionada con el documento padre, y que la relación que se maneja aquí es de uno a muchos.

- **_Referencia con perfil y grupo:_** Me pareció que con la "relación" entre estos modelos me vendría mejor que se referencien entre sí mediante un ObjectId. Ya que la información que comparten es completamente distinta, y en este caso se están manejando relaciones de uno a uno, con User y Profile, y relaciones de muchos a muchos, con User y Group. Además de que cada uno puede existir por separado sin necesidad del otro. O al menos en Mongo asi pasa.

## Populate sin referencia

Sin que exista un campo con una propiedad "ref" que esté referenciando a otro modelo, el populate queda inutilizable. Sin embargo, la consulta aún puede hacerse de forma manual, que es el caso que yo usé cuando realicé la consulta **getAllUsers**, y **getUser**.

- En el primer caso, utilizo un bucle for:

```javascript
 const userProfile = async () => {
      const profiles = [];
      for (let i = 0; i < users.length; i++) {
        let profile = await ProfileModel.find({ owner: users[i]._id });
        profiles.push(profile);
      }

      if (profiles.length == 0) {
        profiles.push("There is no profiles asociated");
      }
```

En cada iteración realizo una consulta al modelo de Profile y envió el resultado a un arreglo vacío. Una vez finalizado el bucle, retorno el arreglo en la función. No se ve, pero más abajo está la invocación de la función, y su valor retornado (el arreglo) es el que mando por la respuesta.

- En el segundo caso, simplemente busco un usuario por id y busco en el modelo Profile alguna coincidencia:

```javascript
const user = await UserModel.findOne({
  _id: id,
  deletedAt: null,
});

const userProfile = await ProfileModel.findOne({ owner: id });

return res.status(200).json({
  ok: true,
  message: "Here is the user",
  User: user,
  Profile: userProfile,
});
```

La lógica utilizada en este caso no es nada del otro mundo.

## Eliminación lógica y en cascada

- ### **_Eliminación lógica_**
  Mongoose como tal no trabaja con eliminación lógica ni en cascada. Por lo tanto, en este caso lo que se hace es hacer una clase de soft-delete, simplemente marcando al documento borrado, como se ve a continuación:

```javascript
const deleteUser = await UserModel.findByIdAndUpdate(
  id,
  {
    deletedAt: new Date(),
  },
  {
    new: true,
  }
);
```

Tras esto, al realizar una búsqueda simplemente se filtra por los usuarios que en el campo **deletedAt** tengan **null**, y el resto se ignora.

- ### **_Eliminación en cascada_**
  Como ya se vió, estas configuraciones en Mongoose deben realizarse de forma manual. Debido a esto, y siguiendo el mismo ejemplo, se hace lo siguiente:

```javascript
const deleteUser = await UserModel.findByIdAndUpdate(
  id,
  {
    deletedAt: new Date(),
  },
  {
    new: true,
  }
);

if (deleteUser) {
  await GroupModel.updateMany({ members: id }, { $pull: { members: id } });

  await ProfileModel.findOneAndDelete({ owner: id });
}

return res.status(200).json({
  ok: true,
  message: "User deleted",
  user_deleted: deleteUser,
});
```

- Lo único que se hace es, una vez marcado el usuario como eliminado, automáticamente se busca y elimina todo documento perteneciente a otras colecciones que guarden alguna referencia con el usuario marcado. De esta forma se logra imitar la eliminación en cascada y se mantiene la integridad referencial. El mismo proceso se repite en los otros lados de la referencia.

## Endpoint que permita agregar vínculos

La solución que encontré para esto fue hacer un endpoint en el que, por parámetros reciba un id de un usuario, y por el body reciba un nombe de algún grupo, de esta forma estoy básicamente **_agregando usuarios a grupos_** y generando el vínculo, como se ve a continuación:

```javascript
const addUserToGroup = await GroupModel.findOneAndUpdate(
  { name: name },
  { $addToSet: { members: id } }
);

const refGroupToUser = await UserModel.findOneAndUpdate(
  { _id: id },
  { $addToSet: { groups: addUserToGroup._id } }
);

return res.status(201).json({
  ok: true,
  message: "Link added",
});
```

De esta forma se consigue guardar la referencia en ambos modelos y estos quedan **vinculados**, teniendo en cuenta que cada esquema, en el campo que referencia al otro modelo está definido como un arreglo, para que guarde varios documentos, simulando una **_relacion de muchos a muchos_**. El endpoint como tal, o la ruta mejor dicho, se vería de esta forma:

```javascript
userGroupRoutes.post(
  "/user-groups/:id",
  createUserGroupValidations,
  applyValidations,
  createUserGroup
);
```

#### **_Con esto quedaría finalizada la explicación de los puntos claves solicitados por los profesores, muchas gracias._**
