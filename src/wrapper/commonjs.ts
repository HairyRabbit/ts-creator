import {
  updateSourceFileNode,
  createSourceFile,
  ScriptTarget,
  createIdentifier,
  createStringLiteral,
  createVariableStatement,
  createVariableDeclarationList,
  createVariableDeclaration,
  createCall,
  createPropertyAccess,
  NodeFlags,
  createExpressionStatement,
  Expression,
  SourceFile,
  createBinary,
  createToken,
  SyntaxKind
} from 'typescript'

/** @internal */
/* istanbul ignore next */
export function resolveCJSModule(expression: Expression): SourceFile {
  /* istanbul ignore next */
  return updateSourceFileNode(
    createSourceFile('templory.ts', '', ScriptTarget.Latest),
    [
      createVariableStatement(
        undefined,
        createVariableDeclarationList(
          [
            createVariableDeclaration(
              createIdentifier('ts'),
              undefined,
              createCall(createIdentifier('require'), undefined, [
                createStringLiteral('typescript')
              ])
            )
          ],
          NodeFlags.Const
        )
      ),
      createVariableStatement(
        undefined,
        createVariableDeclarationList(
          [
            createVariableDeclaration(
              createIdentifier('printer'),
              undefined,
              createCall(
                createPropertyAccess(
                  createIdentifier('ts'),
                  createIdentifier('createPrinter')
                ),
                undefined,
                []
              )
            )
          ],
          NodeFlags.Const
        )
      ),
      createVariableStatement(
        undefined,
        createVariableDeclarationList(
          [
            createVariableDeclaration(
              createIdentifier('file'),
              undefined,
              expression
            )
          ],
          NodeFlags.Const
        )
      ),
      createExpressionStatement(
        createCall(
          createPropertyAccess(
            createIdentifier('printer'),
            createIdentifier('printFile')
          ),
          undefined,
          [createIdentifier('file')]
        )
      ),
      createExpressionStatement(
        createBinary(
          createPropertyAccess(
            createIdentifier('module'),
            createIdentifier('exports')
          ),
          createToken(SyntaxKind.FirstAssignment),
          createCall(
            createPropertyAccess(
              createIdentifier('printer'),
              createIdentifier('printFile')
            ),
            undefined,
            [createIdentifier('file')]
          )
        )
      )
    ]
  )
}
