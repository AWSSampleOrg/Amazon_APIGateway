SOURCED_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCED_DIR}
packaged_templates=$(find . -name packaged_template.yml -type f)

for p in ${packaged_templates[@]}; do
    rm -f $p
done
