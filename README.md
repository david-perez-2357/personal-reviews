
# Personal Reviews
It's an app where you can save your reviews of products, services, experiences... or anything!. You can rate an item in different aspects depending on the category they're associated with, for exaple for videogames you can rate plot, gameplay and graphics
separately. Since your opinion can change over time, you can add multiple reviews to a single product and later see them in a timeline. Items can have an origin, which is where the item came from, for example, for a car its origin can be its brand.

## 🔧 Android Setup
Add this on `/android/app/src/main/java/com/example/app/MainActivity.java`:

```java
import com.getcapacitor.community.database.sqlite.CapacitorSQLite;

this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
    add(CapacitorSQLite.class);
}});
```