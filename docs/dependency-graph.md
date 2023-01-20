```mermaid
flowchart LR

subgraph 0["src"]
1["app.ts"]
subgraph 2["modules"]
subgraph 3["_common"]
4["error-responses.schema.ts"]
end
subgraph 9["user"]
A["user.route.ts"]
B["user.controller.ts"]
C["user.schema.ts"]
end
end
subgraph 5["libs"]
6["openapiSpec.ts"]
subgraph 7["utils"]
8["object.ts"]
E["object.test.ts"]
end
D["prisma.ts"]
end
F["main.ts"]
end
1-->4
1-->A
1-->C
4-->6
4-->8
A-->B
A-->C
B-->C
B-->D
C-->6
C-->8
E-->8
F-->1
```
