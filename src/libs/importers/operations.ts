export interface ImporterOperations<SourceType, DestType> {
  parseAndProduce(data: SourceType): Promise<DestType>;
  persist(data: SourceType): Promise<DestType>;
}
