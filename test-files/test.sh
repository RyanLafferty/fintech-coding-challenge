#!/bin/bash

inputfilename='input.txt'
outfilename='output.txt'
if test -f "$outfilename"; then
  rm $outfilename
fi
touch $outfilename

while read line; do 
  res=$(curl -XPOST -H 'Content-type: application/json' -d "${line}" 'localhost:8080/transactions/load')
  if [ ${#res} -gt 0 ]; then
    echo "${res}" >> $outfilename
  fi
done < $inputfilename
