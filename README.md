# Ruta Alemania

Plataforma en español para organizar el proceso de estudiar en Alemania desde México. La aplicación reúne guías, una vista inicial de becas, buscadores oficiales y una checklist interactiva.

## Tecnologías y requisitos

- Next.js 16 con App Router, React 19 y TypeScript.
- Tailwind CSS 4; fuentes Manrope y Sora mediante `next/font/google`.
- Node.js 20.9 o superior y npm.
- Sin base de datos, autenticación ni variables de entorno obligatorias en la versión actual.

## Desarrollo local

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`. En PowerShell, si la política de ejecución bloquea `npm`, usa `npm.cmd` en los comandos anteriores.

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run lint` | Ejecuta ESLint. |
| `npx tsc --noEmit --incremental false` | Comprueba los tipos sin generar archivos. |
| `npm run build` | Genera y valida la compilación de producción. |
| `npm run start` | Sirve una compilación de producción existente. |

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Página principal y ruta inicial de seis pasos. |
| `/becas` | Becas locales con filtros por nivel, área, idioma y financiamiento. |
| `/guias` | Índice de guías con filtro por categoría. |
| `/guias/[slug]` | Detalle de cada guía publicada; los borradores no tienen ruta pública. |
| `/checklist` | Fases, casillas y progreso de la checklist. |
| `/buscadores` | Recursos externos para programas, solicitudes, becas e información oficial. |
| `/mi-ruta` | Panel personal con progreso, próximos pasos, guías y recursos recomendados. |
| `/mi-ruta/empezar` | Formulario para crear o editar las preferencias de Mi Ruta. |
| `/mi-ruta/aplicaciones` | Seguimiento local de programas, solicitudes y documentos. |
| `/mi-ruta/mis-datos` | Exportación y restauración de respaldos locales. |

## Datos y estado

Las becas, la checklist y los recursos se mantienen en `app/_data/`. Las guías usan un catálogo ligero en `app/_content/guides/catalog.ts` y un archivo de contenido por artículo en `app/_content/guides/articles/`. `app/_content/guides/load-guide.server.ts` carga el texto completo solo para la página de detalle; el catálogo, la página principal y Mi Ruta usan únicamente resúmenes. Los componentes compartidos están en `app/_components/`; los filtros y la checklist interactiva están dentro de sus rutas. No hay API propia ni sincronización entre dispositivos.

## Publicar una guía

1. Crea `app/_content/guides/articles/<slug>.ts` con `intro`, `keyTakeaways`, `checklistItems` (si aplica) y `sections`. Exporta el objeto con el tipo `GuideArticle` de `types.ts`. Conserva un slug existente si estás actualizando un artículo: cambiarlo rompe enlaces guardados.
2. Mientras trabajas, registra el slug y sus metadatos en `drafts.server.ts` con `status: "draft"`; ese archivo no se importa en la interfaz. Usa `null` cuando no tengas una fecha o autoría documentada; no inventes fechas de publicación, revisión o comprobación. Añade fuentes concretas y su fecha de consulta solo después de verificarlas.
3. Antes de publicar, revisa ortografía, enlaces internos, afirmaciones sensibles, citas y requisitos vigentes en fuentes oficiales. Distingue una experiencia personal (`kind: "personal"`) de una guía informativa (`kind: "informational"`); ninguna guía de Ruta Alemania representa a una autoridad oficial. Actualiza `publishedAt`, `updatedAt` y `reviewedAt` únicamente con fechas reales documentadas.
4. Para publicar, mueve la ficha de `drafts.server.ts` a `catalog.ts`, cambia su estado a `"published"` y añade su archivo a `load-guide.server.ts`. El catálogo público contiene solo fichas publicadas; la ruta de detalle bloquea cualquier slug no publicado. No registres borradores en `catalog.ts`, pues ese módulo también se usa en el cliente.
5. Si quieres destacar la guía, actualiza intencionalmente la selección inicial de `/guias`, la vista previa de inicio o las recomendaciones de Mi Ruta. Comprueba que sus slugs sigan publicados. Ejecuta `node --test tests/*.test.mjs`, `npm run lint`, `npx tsc --noEmit --incremental false` y `npm run build` antes de publicar.

Las siete guías migradas conservan su texto y URLs, pero su autoría, fechas y revisión de fuentes no están documentadas: esos campos siguen en `null` y `sources` está vacío. No deben interpretarse como información oficialmente verificada.

La checklist guarda los ID marcados en `localStorage` bajo la clave `ruta-alemania-checklist`. Se restaura después de montar el componente en el navegador para evitar diferencias de hidratación. «Limpiar checklist» borra el progreso local; borrar los datos del navegador también lo elimina. Los filtros de becas y guías usan estado de cliente y se reinician al recargar.

Mi Ruta guarda respuestas y tareas completadas en una estructura versionada (`version: 1`) bajo la clave separada `ruta-alemania:mi-ruta:v1`. El formulario puede reabrirse para editar respuestas sin perder los ID completados. El panel solo cuenta las tareas aplicables al perfil actual; usa los ID estables de la checklist como referencias, pero **no lee ni modifica** `ruta-alemania-checklist`. Si el registro de Mi Ruta es inválido, no se borra automáticamente. La ruta se crea con reglas locales según nivel, idioma, etapa y prioridad; el semestre/año se muestra como meta, no como fuente de fechas de convocatoria. Sin cuenta ni sincronización, el avance pertenece a este navegador y dispositivo y se pierde si se borran sus datos.

Mis Aplicaciones guarda una lista versionada (`version: 1`) en `ruta-alemania:aplicaciones:v1`. Cada registro tiene un ID estable, estado, fechas de creación y actualización, notas y documentos propios. Se pueden añadir, editar, filtrar y eliminar aplicaciones; el borrado pide confirmación. Los enlaces solo admiten `http` o `https`. Las fechas límite son anotaciones personales, no información verificada. Los datos dañados o de otra versión no se reemplazan automáticamente, y esta clave no modifica las de Mi Ruta ni la checklist. Ejecuta las pruebas enfocadas con `node --test tests/mi-ruta-edit.test.mjs tests/aplicaciones.test.mjs`.

Las becas son un **catálogo orientativo pendiente de verificación editorial**. Cada registro incluye `sourceUrl` (página oficial para contrastar la ficha), `officialUrl` (destino del botón), `verificationStatus` y `lastChecked`. Una URL disponible no confirma elegibilidad, idioma, financiación ni fechas. En esta versión todos los registros tienen `verificationStatus: "pending"` y `lastChecked: null`; los campos de elegibilidad y requisitos no comprobados se muestran como «Por confirmar». Solo se debe cambiar el estado a `verified` y registrar una fecha después de revisar la convocatoria vigente y documentar la comprobación. Las fechas y condiciones deben confirmarse siempre en el sitio oficial antes de aplicar.

## Monitoreo editorial de becas

Ejecuta `npm run monitor:becas` con Node.js 24 para consultar manualmente las seis fuentes del registro en `scripts/scholarship-monitor/registry.mjs`. El script respeta `robots.txt`, espera al menos dos segundos entre solicitudes al mismo dominio, limita respuestas y tiempos de espera, y no entra a portales protegidos ni sigue redirecciones. Un `robots.txt` inexistente (404/410) no se interpreta como prohibición; otros errores detienen la consulta a ese dominio. Si una fuente impide el acceso, queda como `source-unavailable` para revisión manual. No cambia `app/_data/scholarships.ts` ni sus indicadores de verificación.

El informe local se genera en `reports/scholarship-monitor/latest.md` y la última respuesta válida de cada fuente en `snapshots.json`, ambos excluidos de Git. La primera consulta establece una línea de base; las siguientes comparan texto normalizado y secciones explícitamente etiquetadas. Un cambio detectado **no** confirma que un plazo, importe o requisito sea aplicable a una persona: abre la fuente oficial y revisa la convocatoria antes de editar el catálogo. Guarda una copia del snapshot si deseas conservar el historial local. Si el archivo de snapshots está corrupto o usa una versión desconocida, el script se detiene sin sobrescribirlo.

`.github/workflows/scholarship-monitor.yml` prepara una ejecución semanal y manual en GitHub Actions. Solo funcionará tras publicar explícitamente el repositorio y el workflow en GitHub; no se ha activado ni ejecutado desde aquí. Recupera el último snapshot conservado como artefacto, ejecuta el monitor y sube informe y snapshot como artefactos de la ejecución, no como páginas del sitio. La visibilidad de los artefactos depende de la configuración del repositorio. Si el artefacto expira, se crea una nueva línea de base. No hay commits ni cambios públicos automáticos. Revisa la política de cada fuente y deshabilita el calendario si su acceso automatizado deja de estar permitido.

## Despliegue

1. Ejecuta `npm run lint`, `npx tsc --noEmit --incremental false` y `npm run build` antes de publicar.
2. Importa el repositorio en Vercel como proyecto Next.js. Mantén el comando de compilación `npm run build` y la configuración de salida predeterminada del framework.
3. Publica desde el panel de Vercel. No se necesitan variables de entorno ni servicios de base de datos para las rutas actuales.

El progreso de la checklist queda en el navegador de cada persona; no se transfiere a otros dispositivos. Antes de difundir la base de becas como información actualizada, completa la revisión de fuentes, requisitos y fechas de cada convocatoria.
