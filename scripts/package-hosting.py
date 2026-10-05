from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root=Path('out')
assert (root/'index.html').exists(), 'Run npm run build first'
with ZipFile('tcsp-hosting.zip','w',ZIP_DEFLATED) as archive:
    for file in root.rglob('*'):
        if file.is_file(): archive.write(file,file.relative_to(root).as_posix())
print(f'Hosting package: {Path("tcsp-hosting.zip").stat().st_size / 1024 / 1024:.1f} MB')
